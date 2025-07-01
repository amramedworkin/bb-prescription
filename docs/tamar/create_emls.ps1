# PowerShell Script to Generate .eml Files from a Word Document

# --- Instructions ---
# 1. Save the provided Word document to a location on your computer.
# 2. Update the '$docPath' variable below with the full path to your saved document.
# 3. This script will create a subfolder named 'emls' where it will save the generated email files.
# 4. Run this script in PowerShell or the Windows PowerShell ISE.
# 5. You can then open the .eml files in Outlook or another email client to review and send them.

# --- Configuration ---
# IMPORTANT: Replace the placeholder path with the actual path to your Word document.
$docPath = "C:\Users\amram_hyf6mkd\OneDrive\CVSAetna\bb-prescription\docs\tamar\aggregated_merged_docs.docx"
$fromEmailAddress = "tamarsplace@gmail.com"

# --- Script ---

# Check if the Word document exists
if (-not (Test-Path -Path $docPath)) {
    Write-Error "Error: The file '$docPath' was not found. Please update the path and try again."
    return
}

# Define the output directory for the .eml files
$outputFolder = Join-Path -Path $PSScriptRoot -ChildPath "emls"
if (-not (Test-Path -Path $outputFolder)) {
    New-Item -Path $outputFolder -ItemType Directory | Out-Null
    Write-Host "Created output directory: $outputFolder"
}

# Start Word and Outlook applications
try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $outlook = New-Object -ComObject Outlook.Application
}
catch {
    Write-Error "Error: Could not start Word or Outlook. Please ensure they are installed and configured."
    return
}

# --- Main Processing Block ---
try {
    $doc = $word.Documents.Open($docPath)
    $letterRanges = @()
    
    # --- Logic to find and create formatted letter ranges ---
    $find = $doc.Content.Find
    $find.Text = "TO: "
    $find.Forward = $true
    $find.Wrap = [Microsoft.Office.Interop.Word.WdFindWrap]::wdFindStop

    $startPositions = New-Object System.Collections.ArrayList
    while ($find.Execute()) {
        $null = $startPositions.Add($find.Parent.Start)
    }

    if ($startPositions.Count -eq 0) {
        $find.Text = "Tamar Dworkin"
        while ($find.Execute()) {
            if ($find.Parent.Start -gt $doc.Content.Start) {
                $null = $startPositions.Add($find.Parent.Start)
            }
        }
    }

    if ($startPositions.Count -eq 0 -or $startPositions[0] -gt 0) {
        $startPositions.Insert(0, 0)
    }

    for ($i = 0; $i -lt $startPositions.Count; $i++) {
        $start = $startPositions[$i]
        $end = if ($i + 1 -lt $startPositions.Count) { $startPositions[$i+1] } else { $doc.Content.End }
        if ($start -lt $end) {
            $letterRanges += $doc.Range($start, $end)
        }
    }

    if ($letterRanges.Count -eq 0) {
        Write-Warning "No letters were found in the document."
    }

    # --- Loop through each letter, create, and SAVE .eml file ---
    $emailCounter = 1
    foreach ($letterRange in $letterRanges) {
        if ($null -eq $letterRange) {
            Write-Warning "Skipping a null range object."
            continue
        }

        $letterText = $letterRange.Text.Trim()

        if ($letterText) {
            $toEmailMatch = $letterText | Select-String -Pattern 'TO: ([\w._%+-]+@[\w.-]+\.[\w]{2,})'
            $jobTitleMatch = $letterText | Select-String -Pattern 'RE: Applicant for (.*?) position'

            if ($toEmailMatch -and $jobTitleMatch) {
                $firstToEmailMatch = if ($toEmailMatch -is [array]) { $toEmailMatch[0] } else { $toEmailMatch }
                $firstJobTitleMatch = if ($jobTitleMatch -is [array]) { $jobTitleMatch[0] } else { $jobTitleMatch }

                $toEmail = $firstToEmailMatch.Matches.Groups[1].Value
                $jobTitle = $firstJobTitleMatch.Matches.Groups[1].Value.Trim()
                $subject = "$jobTitle Position"

                # Define the output file path and name
                $fileName = "{0:D2}.eml" -f $emailCounter
                $filePath = Join-Path -Path $outputFolder -ChildPath $fileName

                # --- Console Output for Verification ---
                Write-Host "--------------------------------------------------" -ForegroundColor Green
                Write-Host "Preparing to save file: $fileName"
                Write-Host "To      : $toEmail"
                Write-Host "Subject : $subject"
                Write-Host "--------------------------------------------------`n"

                try {
                    # Create the mail item
                    $mail = $outlook.CreateItem(0)
                    $mail.To = $toEmail
                    $mail.Subject = $subject
                    
                    # Set the From address using the SendUsingAccount property for reliability
                    $sendAccount = $outlook.Session.Accounts | Where-Object { $_.SmtpAddress -eq $fromEmailAddress }
                    if ($sendAccount) {
                        $mail.SendUsingAccount = $sendAccount
                    } else {
                        $mail.SentOnBehalfOfName = $fromEmailAddress # Fallback
                    }

                    # Get the Word editor from the email inspector and populate the body
                    $inspector = $mail.GetInspector
                    $wordEditor = $inspector.WordEditor
                    
                    if ($wordEditor) {
                        $wordEditor.Content.InsertXML($letterRange.WordOpenXML)
                    } else {
                        $mail.Body = $letterRange.Text # Fallback
                    }

                    # *** MODIFIED: Use a more reliable method to save as .eml ***
                    # olSaveAsType enumeration: 5 = olRFC822 (which is the .eml format)
                    $olRfc822 = 5 
                    $mail.SaveAs($filePath, $olRfc822) 
                    
                    Write-Host "Successfully saved: $filePath" -ForegroundColor Cyan
                    $emailCounter++
                }
                catch {
                    Write-Error "Error creating or saving the email file for ${toEmail}: $_"
                }
            }
        }
    }
}
catch {
    Write-Error "An error occurred during Word document processing or email creation: $_"
}
finally {
    # --- Cleanup ---
    if ($doc) { $doc.Close([ref]$false); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null }
    if ($word) { $word.Quit(); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null }
}

if ($outlook) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($outlook) | Out-Null }
Write-Host "`nScript finished. Check the '$outputFolder' directory for your .eml files." -ForegroundColor Cyan

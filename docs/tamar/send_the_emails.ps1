# PowerShell Script to Automate Sending Cover Letters from a Word Document via Outlook

# --- Instructions ---
# 1. Save the provided Word document to a location on your computer.
# 2. Update the '$docPath' variable below with the full path to your saved document.
# 3. Ensure you have Outlook installed and configured with the email account specified in '$fromEmailAddress'.
# 4. Run this script in PowerShell or the Windows PowerShell ISE.
# 5. The script will pause for confirmation before sending each email.
# 6. To have the script open the email for review instead of sending, change `$mail.Send()` to `$mail.Display()`.

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
# The main logic is wrapped in a try/finally block to ensure Word is closed properly.
try {
    $doc = $word.Documents.Open($docPath)
    $letterRanges = @()
    
    # --- Logic to find and create formatted letter ranges ---
    # Use the Find object to locate the start of each letter.
    # We'll search for the start of the TO: line, as it's a reliable separator.
    $find = $doc.Content.Find
    $find.Text = "TO: "
    $find.Forward = $true
    $find.Wrap = [Microsoft.Office.Interop.Word.WdFindWrap]::wdFindStop

    $startPositions = New-Object System.Collections.ArrayList
    # Execute the find operation to locate all instances
    while ($find.Execute()) {
        $null = $startPositions.Add($find.Parent.Start)
    }

    # If no "TO: " lines were found, fall back to "Tamar Dworkin" as a separator
    if ($startPositions.Count -eq 0) {
        $find.Text = "Tamar Dworkin"
        while ($find.Execute()) {
            if ($find.Parent.Start -gt $doc.Content.Start) {
                $null = $startPositions.Add($find.Parent.Start)
            }
        }
    }

    # Add the very beginning of the document to the list if it contains a letter
    if ($startPositions.Count -eq 0 -or $startPositions[0] -gt 0) {
        $startPositions.Insert(0, 0)
    }

    # Create a range for each letter based on the found start positions
    for ($i = 0; $i -lt $startPositions.Count; $i++) {
        $start = $startPositions[$i]
        $end = if ($i + 1 -lt $startPositions.Count) { $startPositions[$i+1] } else { $doc.Content.End }
        if ($start -lt $end) {
            $letterRanges += $doc.Range($start, $end)
        }
    }

    if ($letterRanges.Count -eq 0) {
        Write-Warning "No letters were found in the document. Please check the content and separator text."
    }

    # --- Loop through each letter, create, and send email ---
    # This loop MUST be inside the 'try' block, while the document is still open.
    $dontAskAgain = $false

    foreach ($letterRange in $letterRanges) {
        if ($null -eq $letterRange) {
            Write-Warning "Skipping a null range object. This might indicate an issue with document parsing."
            continue
        }

        $letterText = $letterRange.Text.Trim()

        if ($letterText) {
            # Use Select-String and be robust about handling the results
            $toEmailMatch = $letterText | Select-String -Pattern 'TO: ([\w._%+-]+@[\w.-]+\.[\w]{2,})'
            $jobTitleMatch = $letterText | Select-String -Pattern 'RE: Applicant for (.*?) position'

            # Check if both matches were found before proceeding
            if ($toEmailMatch -and $jobTitleMatch) {
                # Handle cases where Select-String returns a single match or an array of matches
                $firstToEmailMatch = if ($toEmailMatch -is [array]) { $toEmailMatch[0] } else { $toEmailMatch }
                $firstJobTitleMatch = if ($jobTitleMatch -is [array]) { $jobTitleMatch[0] } else { $jobTitleMatch }

                $toEmail = $firstToEmailMatch.Matches.Groups[1].Value
                $jobTitle = $firstJobTitleMatch.Matches.Groups[1].Value.Trim()
                
                # --- Corrected Subject Line ---
                $subject = "$jobTitle Position"

                $sendAccount = $outlook.Session.Accounts | Where-Object { $_.SmtpAddress -eq $fromEmailAddress }

                # --- Console Output for Verification ---
                $bodyPreview = $letterText.Substring(0, [System.Math]::Min($letterText.Length, 80))
                $accountName = if ($sendAccount) { $sendAccount.DisplayName } else { "Default Account ('$fromEmailAddress' not found)" }
                Write-Host "--------------------------------------------------" -ForegroundColor Green
                Write-Host "To           : $toEmail"
                Write-Host "Subject      : $subject"
                Write-Host "Body Preview : $($bodyPreview)..."
                Write-Host "From Account : $accountName"
                Write-Host "--------------------------------------------------`n"

                # --- Confirmation Prompt ---
                $shouldSend = $false
                if (-not $dontAskAgain) {
                    $promptMessage = "Send email to $toEmail? [Y] Yes / [N] No / [A] Yes to All / [Q] Quit"
                    $choice = Read-Host -Prompt $promptMessage

                    switch -regex ($choice.ToUpper()) {
                        '^Y' { $shouldSend = $true }
                        '^A' { $shouldSend = $true; $dontAskAgain = $true }
                        '^Q' { Write-Host "Quitting script."; break }
                        default { Write-Warning "Skipping this email." }
                    }
                } else {
                    $shouldSend = $true
                }

                if ($shouldSend) {
                    try {
                        $mail = $outlook.CreateItem(0)
                        $mail.To = $toEmail
                        $mail.Subject = $subject
                        if ($sendAccount) { $mail.SendUsingAccount = $sendAccount }

                        # --- MODIFIED: Preserve Formatting using WordOpenXML (more reliable than clipboard) ---
                        # Get the Word editor from the email inspector
                        $inspector = $mail.GetInspector
                        $wordEditor = $inspector.WordEditor
                        
                        if ($wordEditor) {
                            # Insert the formatted content directly using Word's XML format
                            $wordEditor.Content.InsertXML($letterRange.WordOpenXML)
                        } else {
                            # Fallback to plain text if Word editor is not available
                            $mail.Body = $letterRange.Text
                        }

                        # Send the email
                        $mail.Send()
                        # $mail.Display() # Use this instead of .Send() to review before sending
                        
                        Write-Host "Email sent to $toEmail." -ForegroundColor Cyan
                    }
                    catch {
                        Write-Error "Error creating or sending the Outlook email for ${toEmail}: $_"
                    }
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
    # Close the Word document and quit the application
    if ($doc) { $doc.Close([ref]$false); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($doc) | Out-Null }
    if ($word) { $word.Quit(); [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null }
}

# Clean up the Outlook COM object after all emails are processed
if ($outlook) { [System.Runtime.Interopservices.Marshal]::ReleaseComObject($outlook) | Out-Null }
Write-Host "`nScript finished." -ForegroundColor Cyan

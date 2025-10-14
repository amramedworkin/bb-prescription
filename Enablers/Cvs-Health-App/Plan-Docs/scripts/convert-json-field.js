const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('Usage: node convert-json-field.js <input-file> <field-path> [output-file]');
    console.error('Example: node convert-json-field.js ../for_ai/json/input.json "@message.data"');
    console.error('Example: node convert-json-field.js ../for_ai/json/input.json "@message.data" ../for_ai/json/output.json');
    console.error('');
    console.error('Field path examples:');
    console.error('  "@message.data" -> "@message.datafied"');
    console.error('  "@message.cachedResponse" -> "@message.cachedResponseified"');
    console.error('  "@data.x" -> "@data.xfied"');
    console.error('  "@data.y" -> "@data.yified"');
    process.exit(1);
}

// Input and output file paths
const inputFile = path.resolve(args[0]);
const fieldPath = args[1];
const outputFile = args[2] ? path.resolve(args[2]) : null;

// Function to determine the extension based on the field name
function getExtension(fieldName) {
    const lastChar = fieldName.charAt(fieldName.length - 1).toLowerCase();
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    
    if (vowels.includes(lastChar)) {
        return 'fied';
    } else {
        return 'ified';
    }
}

// Function to get nested object value using dot notation
function getNestedValue(obj, path) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    
    return current;
}

// Function to set nested object value using dot notation
function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current) || typeof current[key] !== 'object') {
            current[key] = {};
        }
        current = current[key];
    }
    
    // Set the value
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
}

try {
    // Read the input JSON file
    console.log('Reading input file:', inputFile);
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    console.log(`Processing ${jsonData.length} records...`);
    console.log(`Field path: ${fieldPath}`);
    
    // Handle the path correctly - keep @ symbols in the path
    const pathParts = fieldPath.split('.');
    const fieldName = pathParts[pathParts.length - 1];
    const extension = getExtension(fieldName);
    const newFieldName = fieldName + extension;
    
    // Create the new path by replacing the last part
    pathParts[pathParts.length - 1] = newFieldName;
    const newFieldPath = pathParts.join('.');
    
    console.log(`Converting ${fieldPath} to ${newFieldPath}`);
    
    // Generate output filename if not provided - use only the field name, not the full path
    let finalOutputFile = outputFile;
    if (!finalOutputFile) {
        const inputDir = path.dirname(inputFile);
        const inputBaseName = path.basename(inputFile, '.json');
        finalOutputFile = path.join(inputDir, `${inputBaseName}-${newFieldName}_field_added.json`);
    }
    
    // Process each record
    const processedData = jsonData.map((record, index) => {
        // Create a copy of the record
        const processedRecord = { ...record };
        
        // Get the original field value
        const originalValue = getNestedValue(processedRecord, fieldPath);
        
        if (originalValue !== undefined) {
            try {
                // Parse the JSON string
                const parsedValue = JSON.parse(originalValue);
                
                // Set the new field with parsed value
                setNestedValue(processedRecord, newFieldPath, parsedValue);
                
                console.log(`Record ${index + 1}: Successfully converted ${fieldPath} to ${newFieldPath}`);
            } catch (parseError) {
                console.warn(`Record ${index + 1}: Failed to parse ${fieldPath}:`, parseError.message);
                // Set the new field to null if parsing fails
                setNestedValue(processedRecord, newFieldPath, null);
                // Add error information
                setNestedValue(processedRecord, newFieldPath + 'ParseError', parseError.message);
            }
        } else {
            console.log(`Record ${index + 1}: Field ${fieldPath} not found`);
            // Set the new field to null if original field doesn't exist
            setNestedValue(processedRecord, newFieldPath, null);
        }
        
        return processedRecord;
    });
    
    // Write the processed data to the output file
    console.log('Writing output file:', finalOutputFile);
    fs.writeFileSync(finalOutputFile, JSON.stringify(processedData, null, 2), 'utf8');
    
    console.log('Processing completed successfully!');
    console.log(`Input records: ${jsonData.length}`);
    console.log(`Output records: ${processedData.length}`);
    console.log(`Field converted: ${fieldPath} -> ${newFieldPath}`);
    console.log(`Output file: ${finalOutputFile}`);
    
} catch (error) {
    console.error('Error processing file:', error.message);
    process.exit(1);
} 
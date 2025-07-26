const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 1) {
    console.error('Usage: node process-plan-groups-data.js <input-file> [output-file]');
    console.error('Example: node process-plan-groups-data.js ../for_ai/json/input.json');
    console.error('Example: node process-plan-groups-data.js ../for_ai/json/input.json ../for_ai/json/output.json');
    process.exit(1);
}

// Input and output file paths
const inputFile = path.resolve(args[0]);
const outputFile = args[1] ? path.resolve(args[1]) : inputFile.replace('.json', '-datafied.json');

try {
    // Read the input JSON file
    console.log('Reading input file:', inputFile);
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    console.log(`Processing ${jsonData.length} records...`);
    
    // Process each record
    const processedData = jsonData.map((record, index) => {
        const message = record['@message'];
        
        // Create a copy of the record
        const processedRecord = { ...record };
        
        // Initialize the processed message
        const processedMessage = { ...message };
        
        // If the message has a data field, parse it and add as datafied
        if (message && message.data) {
            try {
                const parsedData = JSON.parse(message.data);
                processedMessage.datafied = parsedData;
                console.log(`Record ${index + 1}: Successfully parsed data field`);
            } catch (parseError) {
                console.warn(`Record ${index + 1}: Failed to parse data field:`, parseError.message);
                processedMessage.datafied = null;
                processedMessage.dataParseError = parseError.message;
            }
        } else {
            console.log(`Record ${index + 1}: No data field found`);
            processedMessage.datafied = null;
        }
        
        // Parse EIE headers that are JSON strings
        if (message && message.headers) {
            const processedHeaders = { ...message.headers };
            
            // Parse EIE headers that are JSON strings
            const eieHeaders = [
                'eieheaderversion',
                'eieheaderusercontext', 
                'eieheaderapplicationidentifier',
                'eieheaderorchestratingapplicationidentifier'
            ];
            
            eieHeaders.forEach(headerName => {
                if (processedHeaders[headerName]) {
                    try {
                        const parsedHeader = JSON.parse(processedHeaders[headerName]);
                        processedHeaders[`${headerName}Deconstructed`] = parsedHeader;
                    } catch (parseError) {
                        console.warn(`Record ${index + 1}: Failed to parse ${headerName}:`, parseError.message);
                        processedHeaders[`${headerName}Deconstructed`] = null;
                        processedHeaders[`${headerName}ParseError`] = parseError.message;
                    }
                }
            });
            
            processedMessage.headers = processedHeaders;
        }
        
        processedRecord['@message'] = processedMessage;
        return processedRecord;
    });
    
    // Write the processed data to the output file
    console.log('Writing output file:', outputFile);
    fs.writeFileSync(outputFile, JSON.stringify(processedData, null, 2), 'utf8');
    
    console.log('Processing completed successfully!');
    console.log(`Input records: ${jsonData.length}`);
    console.log(`Output records: ${processedData.length}`);
    
} catch (error) {
    console.error('Error processing file:', error.message);
    process.exit(1);
} 
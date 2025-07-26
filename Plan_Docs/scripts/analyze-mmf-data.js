const fs = require('fs');
const path = require('path');

// Read the JSON file
const inputFile = path.join(__dirname, '../for_ai/json/qa-master-multimembershipfeatures-30_rows.json');

try {
    console.log('Reading file:', inputFile);
    const rawData = fs.readFileSync(inputFile, 'utf8');
    const jsonData = JSON.parse(rawData);
    
    console.log(`Total records: ${jsonData.length}`);
    console.log('\n=== ANALYSIS ===\n');
    
    // Analyze each record
    jsonData.forEach((record, index) => {
        const message = record['@message'];
        const rowNum = index + 1;
        
        console.log(`\n--- ROW ${rowNum} ---`);
        console.log(`Timestamp: ${record['@timestamp']}`);
        console.log(`Message type: ${message.msg || 'N/A'}`);
        console.log(`URL: ${message.url || 'N/A'}`);
        console.log(`Method: ${message.method || 'N/A'}`);
        console.log(`Status: ${message.status || 'N/A'}`);
        
        // Check for key fields that might indicate data richness
        const hasBody = message.body && Object.keys(message.body).length > 0;
        const hasCachedResponse = message.cachedResponse ? true : false;
        const hasData = message.data ? true : false;
        const hasHeaders = message.headers && Object.keys(message.headers).length > 0;
        
        console.log(`Has body: ${hasBody}`);
        console.log(`Has cached response: ${hasCachedResponse}`);
        console.log(`Has data: ${hasData}`);
        console.log(`Has headers: ${hasHeaders}`);
        
        // Count fields in @message
        const messageFieldCount = Object.keys(message).length;
        console.log(`Total fields in @message: ${messageFieldCount}`);
        
        // Check for specific indicators
        if (message.cachedResponse) {
            console.log(`Cached response length: ${message.cachedResponse.length} characters`);
        }
        
        if (message.body && message.body.memberships) {
            console.log(`Memberships count: ${message.body.memberships.length}`);
        }
        
        // Special analysis for row 28
        if (rowNum === 28) {
            console.log('\n*** ROW 28 SPECIAL ANALYSIS ***');
            console.log('All @message fields:', Object.keys(message));
            
            if (message.cachedResponse) {
                try {
                    const parsedCache = JSON.parse(message.cachedResponse);
                    console.log(`Parsed cached response has ${parsedCache.length} items`);
                    if (parsedCache[0] && parsedCache[0].features) {
                        console.log(`First item has ${parsedCache[0].features.length} features`);
                    }
                } catch (e) {
                    console.log('Could not parse cached response');
                }
            }
        }
    });
    
    // Find records with the most data
    console.log('\n=== RECORDS WITH MOST DATA ===\n');
    
    const recordsWithData = jsonData.map((record, index) => {
        const message = record['@message'];
        const dataScore = (message.cachedResponse ? message.cachedResponse.length : 0) + 
                         (message.body ? JSON.stringify(message.body).length : 0) +
                         (message.data ? message.data.length : 0);
        
        return {
            row: index + 1,
            timestamp: record['@timestamp'],
            msg: message.msg,
            url: message.url,
            method: message.method,
            status: message.status,
            dataScore,
            hasCachedResponse: !!message.cachedResponse,
            hasBody: !!(message.body && Object.keys(message.body).length > 0),
            fieldCount: Object.keys(message).length
        };
    });
    
    // Sort by data score
    recordsWithData.sort((a, b) => b.dataScore - a.dataScore);
    
    recordsWithData.slice(0, 5).forEach(record => {
        console.log(`Row ${record.row}: Score=${record.dataScore}, Fields=${record.fieldCount}, Cached=${record.hasCachedResponse}, Body=${record.hasBody}, URL=${record.url}, Method=${record.method}, Status=${record.status}`);
    });
    
    // Find filtering criteria
    console.log('\n=== FILTERING CRITERIA SUGGESTIONS ===\n');
    
    const recordsWithCachedResponse = recordsWithData.filter(r => r.hasCachedResponse);
    const recordsWithBody = recordsWithData.filter(r => r.hasBody);
    const recordsWithHighDataScore = recordsWithData.filter(r => r.dataScore > 1000);
    
    console.log(`Records with cached response: ${recordsWithCachedResponse.length}`);
    console.log(`Records with body: ${recordsWithBody.length}`);
    console.log(`Records with high data score (>1000): ${recordsWithHighDataScore.length}`);
    
    console.log('\nSuggested filters:');
    console.log('1. Filter for records with cachedResponse field');
    console.log('2. Filter for records with body.memberships');
    console.log('3. Filter for records with dataScore > 1000');
    console.log('4. Filter for records with msg = "cached response"');
    
} catch (error) {
    console.error('Error analyzing file:', error.message);
    process.exit(1);
} 
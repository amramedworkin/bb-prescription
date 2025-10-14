# OpenPlatform - Plan Documents BFF API Specification

## API Information

| Field | Value |
|-------|-------|
| Title | OpenPlatform - Plan Documents BFF |
| Description | Provides plan document list and PDF retrieval for the OpenPlatform |
| Version | 1.0.0 |
| OpenAPI Version | 3.0.3 |

## Endpoints

### 1. Plan Document List
- **Path**: `/sa/plandocs/v1/list`
- **Method**: POST
- **Summary**: Retrieves the list of plan documents for a user
- **Request Body**: Required (PlanDocListRequest)
- **Response**: PlanDocListResponse

**Response Codes:**
- `200`: Successful retrieval of document list
- `400`: Bad request
- `500`: Internal Server Error

### 2. Plan Document Retrieve
- **Path**: `/sa/plandocs/v1/retrieve`
- **Method**: POST
- **Summary**: Retrieves a specific plan document PDF
- **Request Body**: Required (PlanDocRetrieveRequest)
- **Response**: PDF file (binary)

**Response Codes:**
- `200`: Success - PDF file returned
- `400`: Bad request
- `500`: Internal Server Error

## Data Models

### PlanDocListRequest
**Required Fields:**
- `policyResourceId` (string): Policy Resource ID from application startup API
- `membershipResourceId` (string): Membership Resource ID from application startup API
- `dateAsOf` (date): Date for which the documents are requested (YYYY-MM-DD)

**Example:**
```json
{
  "data": {
    "policyResourceId": "3~141975+A+1",
    "membershipResourceId": "5~235287654+10+1+20200601+141975+A+1",
    "dateAsOf": "2025-06-28"
  }
}
```

### PlanDocListResponse
**Fields:**
- `data` (array): Array of DocumentMetadata objects
- `reasonCode` (string, optional): Reason code for special scenarios (e.g., "HHL Not signed")

### DocumentMetadata
**Fields:**
- `webHyperlink` (string): URL for the communication content
- `documentType` (string): Type of document (e.g., Dental, Medical, SBC, EOC)
- `description` (string): Description of the communication content
- `title` (string): Title of the communication content
- `format` (string): Format of the document (e.g., PDF, HTML)
- `documentSubType` (string): Sub-type of the document (e.g., SBCIVLEX, EOCDTLS)
- `language` (string): Language of the communication content (e.g., ENG, SPA)
- `contentSize` (string): Size of the content in bytes
- `communicationContentIdentifier` (array): Identifiers for the communication content
- `communicationContentEffectivePeriod` (object): Effective period of the communication content
- `planId` (string): Plan identifier
- `documentName` (string): Name of the document
- `documentId` (string): Unique document identifier
- `documentUrl` (string): Internal URL to retrieve the PDF via BFF

### PlanDocRetrieveRequest
**Required Fields:**
- `documentId` (string): Corresponds to communicationContentResourceId in the backend

**Example:**
```json
{
  "documentId": "70023~13910995"
}
```

### Error
**Fields:**
- `httpCode` (string): HTTP status code
- `httpMessage` (string): HTTP status message
- `moreInformation` (string): Additional error information

**Example:**
```json
{
  "httpCode": "400",
  "httpMessage": "Bad Request",
  "moreInformation": "planId is a required field."
}
``` 
# Plan Documents AWS API Specification

## API Information (APIForge)

| Field | Value |
|-------|-------|
| Alternative Version | 0.0.11.0.0 |
| Specification Description | Provides the plan document json list and pdf to client |
| Document Type | Microservices |
| Security Pattern | default |
| Line of Business | Aetna |
| Domain | Benefit |
| Specification Owner | aetna-pharmille-members |
| Created By | JackmanJ1@aetna.com |

## API Details

| Field | Value |
|-------|-------|
| Title | Plan Document |
| Description | Provides the plan document json list and pdf to client |
| Version | 1.1.0 |
| OpenAPI Version | 3.0.3 |
| Base URL | /v1 |

## Endpoints

### 1. Plan Document List
- **Path**: `/plan-document-list/retrieve`
- **Method**: POST
- **Tags**: Commercial/Medicare Plan Doc List
- **Summary**: Provides the plan document list to client
- **Request Body**: Required (planDocListRequest)
- **Response**: planDocListResponse

**Response Codes:**
- `200`: Success
- `400`: Bad request
- `403`: Forbidden
- `404`: Not found
- `500`: Internal Server error
- `503`: Service Unavailable
- `504`: Timeout

### 2. Plan Document Retrieve
- **Path**: `/plan-document/retrieve`
- **Method**: POST
- **Tags**: Commercial/Medicare Plan Doc Retrieve
- **Summary**: Returns the plan document to client
- **Request Body**: Required (planDocRetrieveRequest)
- **Response**: PDF file (binary) or JSON success response

**Response Codes:**
- `200`: Success (PDF or JSON)
- `400`: Bad request
- `403`: Forbidden
- `404`: Not found
- `500`: Internal Server error
- `503`: Service Unavailable
- `504`: Timeout

## Data Models

### planDocListRequest
**Required Fields:**
- `policyResourceId` (string): Policy Resource ID
- `membershipResourceId` (string): Membership Resource ID
- `dateAsOf` (string): Date for which documents are requested

**Example:**
```json
{
  "membershipResourceId": "5~265106287+11+51+20190101+751133+BA+2",
  "policyResourceId": "3~751133+BA+2",
  "dateAsOf": "2025-05-30T00:00:00.000Z"
}
```

### planDocListResponse
**Required Fields:**
- `readHealthPoliciesCommunicationContentsResponse` (object)

**Structure:**
```json
{
  "readHealthPoliciesCommunicationContentsResponse": {
    "readCommunicationContents": {
      "communicationContent": [
        {
          "webHyperlink": "string",
          "documentType": "string",
          "description": "string",
          "title": "string",
          "format": "string",
          "documentSubType": "string",
          "language": "string",
          "contentSize": "string",
          "communicationContentIdentifier": [
            {
              "idSource": "string",
              "idValue": "string",
              "idType": "string",
              "resourceId": "string"
            }
          ],
          "communicationContentEffectivePeriod": {
            "dateTimeAsOf": "string",
            "dateTimeBegin": "string",
            "dateTimeEnd": "string"
          },
          "viewerURL": "string"
        }
      ]
    }
  }
}
```

**Required Fields in communicationContent:**
- `webHyperlink` (string): URL for the communication content
- `documentType` (string): Type of the document
- `description` (string): Description of the communication content
- `communicationContentIdentifier` (array): Identifiers for the communication content

**Optional Fields in communicationContent:**
- `title` (string): Title of the communication content
- `format` (string): Format of the document (e.g., PDF, HTML)
- `documentSubType` (string): Sub-type of the document
- `language` (string): Language of the communication content
- `contentSize` (string): Size of the content
- `communicationContentEffectivePeriod` (object): Effective period of the communication content
- `viewerURL` (string): URL to view the content in a viewer application

### planDocRetrieveRequest
**Required Fields:**
- `communicationContentResourceId` (string): Resource ID for the communication content

**Example:**
```json
{
  "communicationContentResourceId": "70023~13910995"
}
```

### error
**Fields:**
- `httpCode` (string): Status code to determine what went wrong
- `httpMessage` (string): Human readable description of the status code
- `moreInformation` (string): More detailed description of the error
- `status` (integer): Status code for downstream system response
- `title` (string): Human readable description of the status code
- `detail` (string): More detailed description of the error

**Example:**
```json
{
  "httpCode": "400",
  "httpMessage": "Bad request",
  "moreInformation": "member resource id is invalid",
  "status": 400,
  "title": "Bad request",
  "detail": "member resource id is invalid"
}
``` 
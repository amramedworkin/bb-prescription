# Plan Documents Flow - CVS SuperApp Integration

## Overview
This document describes the flow for retrieving plan documents through the CVS SuperApp integration with Aetna Health systems.

## Flow Steps

### 1. Initial Request
**CVS SuperApp** sends a POST request to `/sa/plandocs/v1/list` to **API Gateway** with the member's JWT
- **JWT Definition**: Located in `/for_ai/json/id_token_jwt.json`

### 2. JWT Processing at API Gateway
- **2.a** Validates the JWT
- **2.b** Transforms the JWT to EIE headers
  - **EIE Headers Definition**: Located in `/for_ai/json/eie_headers_extracted_from_jwt.txt`
- **2.c** Forwards the request with EIE headers to `/sa/plandocs/v1/list` in CVS BFF

### 3. BFF Orchestration
**CVS BFF** at `/sa/plandocs/v1/list` orchestrates the document list retrieval:

#### 3.a Cache Check
- **3.a.1** Checks cache using the same cache key as ID Cards (EIE Header `EIEHeaderUserContext`)
- **3.a.2** If cached, skip to step 5

#### 3.b Application Startup Sequence
Performs OpenPlatform (SuperApp) application startup sequence (common superapp initialization):

**3.b.1** Calls `/v1/plangroups` on Plan Groups server/GW

**EIE Headers Required:**
| Name | Description | Required | Type | Location | Values |
|------|-------------|----------|------|----------|---------|
| `eieheaderusercontext` | User context | Required | string | header | - |
| `eieheaderapplicationidentifier` | Application identifier | Optional | string | header | - |
| `eieheaderaction` | Action | Optional | string | header | - |
| `eieheaderorchestratingapplicationidentifier` | Orchestrating app ID | Optional | string | header | - |
| `eieheaderversion` | Version | Optional | string | header | - |
| `eieheadertransactionid` | Transaction ID | Optional | string | header | - |
| `x-qapath` | QA path | Optional | string | header | - |
| `lineOfBusiness` | Line of business | Optional | array[string] | query | Commercial, Medicare, Medicaid |
| `planSponsorIds` | Plan sponsor IDs | Optional | array[string] | query | Returned in response |
| `role` | Relationship type | Optional | string | query | Self, Other Relative |

**3.b.1.A.i** EIE headers in test derive from Postman variables defined in `/directions/postsman/qa-client_bff-v3_plangroups_select-variables.csv`

**3.b.1.A.ii** Line of Business should be "Commercial"

**3.b.1.A.iii** Role = "self" pulled from EIE Headers `eieheaderusercontext`

### 4. Plan Groups Retrieval
Retrieves plan groups with parameters: `lineOfBusiness=Commercial` for MVP

### 5. Response Filtering
**CVS-BFF** filters the PlanGroups response:
- **5.a** Excludes groups with certain plan sponsor IDs (955, 988)
- **5.b** Filters for "Actively Covered" status
- **5.c** Further filters for policies with primary type "Dental" or "Medical"

### 6. Features Check
**CVS-BFF** dispatches a POST request to **MMF v2/features API** to check if `["CVSSuperApp"]` features are enabled.

#### 6.a Request Parameters
```json
{
  "memberships": [
    {
      "membershipResourceId": "5~185762462+10+1+20220101+789436+A+1",
      "features": ["CVSSuperApp"],
      "enabledOnly": true
    },
    {
      "membershipResourceId": "5~185762462+10+2+20220101+789436+B+2",
      "features": ["CVSSuperApp"],
      "enabledOnly": true
    }
  ]
}
```

#### 6.b Response Processing
- Filters out memberships not enabled for CVS SuperApp
- **Note**: SuperApp is off by default

#### 6.c Empty Response Handling
If none enabled, CVS-BFF returns:
- **Status**: 204 No Content or 200 OK
- **Response**:
```json
{
  "data": []
}
```

#### 6.d Caching
If features are enabled, CVS-BFF caches the trimmed down list using the same cache key as ID Cards

### 7. [MISSING STEP]
*Note: Step 7 appears to be missing from the original flow*

### 8. Response Construction
**CVS-BFF** processes responses and constructs the JSON array:

#### 8.a Processing Logic
Loop through plangroups response:
- `data->planGroups`
- `lineOfBusiness = "Commercial"`
- Loop through `policies[]`
- Loop through `memberships`
- Filter on `status = "Actively Covered"`

#### 8.b JSON Object Creation
```json
{
  "documentListRequest": {
    "dateAsOf": "2025-05-30T00:00:00.000Z",
    "lists": [
      {
        "primaryPolicyType": "Medical",
        "membershipResourceId": "5~266118742+10+1+20220101+804502+C+1",
        "policyResourceId": "3~804502+C+1"
      },
      {
        "primaryPolicyType": "Dental",
        "membershipResourceId": "<some other id>",
        "policyResourceId": "3~804502+C+1"
      }
    ]
  }
}
```

### 9. Plan Document Retrieval
Calls `/v1/plan-document-list/retrieve` in Plan Docs Service for each item in the lists
- **9.a** Calls are made in parallel

### 10. Response Construction
Constructs the response JSON payload from responses:

#### 10.a Successful Response
```json
{
  "data": [
    {
      "planId": "751133+BA+2",
      "documentName": "Plan Document (Spanish)",
      "documentId": "70023~13910995",
      "documentUrl": "/sa/plandocs/v1/retrieve/70023~13910995"
    }
  ]
}
```

#### 10.b HHL Not Signed Response
```json
{
  "data": [
    {
      "planId": "751133+BA+2",
      "documentName": "Plan Document (Spanish)",
      "documentId": "70023~13910995",
      "documentUrl": "/sa/plandocs/v1/retrieve/70023~13910995"
    },
    {
      "planId": "751134+BA+2",
      "readCommunicationsResponse": "HHL Not signed"
    }
  ]
}
```

### 11. Final Response
**API Gateway** sends the final plan services response back to the **CVS SuperApp**

---

## Issues Identified and Fixed

1. **Typo**: "APIc GW" → "API Gateway"
2. **Typo**: "definded" → "defined"
3. **Typo**: "initializationj" → "initialization"
4. **Typo**: "planrgroups" → "plangroups"
5. **Typo**: "Withg" → "With"
6. **Missing Step**: Step 7 is missing from the original flow
7. **Formatting**: Improved overall structure and readability
8. **JSON Formatting**: Fixed JSON syntax and indentation
9. **Table Format**: Converted EIE headers to a proper table format
10. **Consistency**: Standardized terminology and formatting throughout
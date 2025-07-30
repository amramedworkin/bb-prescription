# EIE Headers Reference

Enterprise Integration Engine (EIE) Headers are appended to an incoming request by APIC and passed on to the internal services (IIB or AH Orchestration etc.).

Contains certain data regarding the logged in user, generated during the login flow in the form of JWT token. 

JWT token is passed to the client, which then passes it as part of APIC calls. JWT token is the encrypted version of EIE headers. APIC decrypts this and forms EIE headers in the HTTP headers.

## EIE Headers Table

| Field | Sample Value | Type | Description |
|-------|--------------|------|-------------|
| EIEHeaderAction | Read | String | Action |
| EIEHeaderTransactionID | 204406433 | String | Global Transaction Id |
| EIEHeaderApplicationIdentifier | JSON Object | JSON | Member application |
| EIEHeaderOrchestratingApplicationIdentifier | JSON Object | JSON | Orchestration application, if applicable |
| EIEHeaderImpersonatingApplicationIdentifier | JSON Object | JSON | Impersonation application, if applicable |
| EIEHeaderVersion | JSON Object | JSON | EIE Header version |
| EIEHeaderUserContext | JSON Object | JSON | Account Info from LDAP. If impersonation, Roles are present for the CSR (must be AETH). Otherwise, member (must be AETH). Contains CSR Info and Member Info |

## JSON Examples

### EIEHeaderApplicationIdentifier
```json
{
  "applicationIdentifier": {
    "idSource": 108,
    "idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",
    "idType": "applications"
  }
}
```

### EIEHeaderOrchestratingApplicationIdentifier
```json
{
  "applicationIdentifier": {
    "idSource": 108,
    "idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",
    "idType": "applications"
  }
}
```

### EIEHeaderImpersonatingApplicationIdentifier
```json
{
  "applicationIdentifier": {
    "idSource": 108,
    "idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",
    "idType": "applications"
  }
}
```

### EIEHeaderVersion
```json
{
  "eieHeaderVersion": {
    "major": 2,
    "minor": 0,
    "maintenance": 0
  }
}
```

### EIEHeaderUserContext
```json
{
  "eieHeaderUserContext": {
    "dnAccountName": "CN=QASP1-SUB-180902748,OU=Members,OU=External,DC=aetheq,DC=aetnaeq,DC=com",
    "assuranceLevel": "http://consumer.aetna.com/assurance/loa-2",
    "eieHeaderAuthorizedRole": [
      {
        "authorizedRole": "AETH-User-Role-1"
      },
      {
        "authorizedRole": "AETH-User-Role-2"
      }
    ],
    "impersonatingAccountIdentifier": {
      "idSource": "1",
      "idValue": "POCDevData7",
      "idType": "accounts"
    },
    "accountIdentifier": {
      "idSource": "1",
      "idValue": "POCDevData7",
      "idType": "accounts"
    }
  }
}
``` 
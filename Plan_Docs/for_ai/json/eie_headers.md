# EIE Headers Reference

Enterprise Integration Engine (EIE) Headers are appended to an incoming request by APIC and passed on to the internal services (IIB or AH Orchestration etc.).

Contains certain data regarding the logged in user, generated during the login flow in the form of JWT token. 

JWT token is passed to the client, which then passes it as part of APIC calls. JWT token is the encrypted version of EIE headers. APIC decrypts this and forms EIE headers in the HTTP headers.

## EIE Headers Table

| Field | Sample Value | Type | Description |
|-------|--------------|------|-------------|
| EIEHeaderAction | Read | String | Action |
| EIEHeaderTransactionID | 204406433 | String | Global Transaction Id |
| EIEHeaderApplicationIdentifier | ```json<br>{<br>&nbsp;&nbsp;"applicationIdentifier": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"idSource": 108,<br>&nbsp;&nbsp;&nbsp;&nbsp;"idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",<br>&nbsp;&nbsp;&nbsp;&nbsp;"idType": "applications"<br>&nbsp;&nbsp;}<br>}``` | JSON | Member application |
| EIEHeaderOrchestratingApplicationIdentifier | ```json<br>{<br>&nbsp;&nbsp;"applicationIdentifier": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"idSource": 108,<br>&nbsp;&nbsp;&nbsp;&nbsp;"idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",<br>&nbsp;&nbsp;&nbsp;&nbsp;"idType": "applications"<br>&nbsp;&nbsp;}<br>}``` | JSON | Orchestration application, if applicable |
| EIEHeaderImpersonatingApplicationIdentifier | ```json<br>{<br>&nbsp;&nbsp;"applicationIdentifier": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"idSource": 108,<br>&nbsp;&nbsp;&nbsp;&nbsp;"idValue": "abbbxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx",<br>&nbsp;&nbsp;&nbsp;&nbsp;"idType": "applications"<br>&nbsp;&nbsp;}<br>}``` | JSON | Impersonation application, if applicable |
| EIEHeaderVersion | ```json<br>{<br>&nbsp;&nbsp;"eieHeaderVersion": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"major": 2,<br>&nbsp;&nbsp;&nbsp;&nbsp;"minor": 0,<br>&nbsp;&nbsp;&nbsp;&nbsp;"maintenance": 0<br>&nbsp;&nbsp;}<br>}``` | JSON | EIE Header version |
| EIEHeaderUserContext | ```json<br>{<br>&nbsp;&nbsp;"eieHeaderUserContext": {<br>&nbsp;&nbsp;&nbsp;&nbsp;"dnAccountName": "CN=QASP1-SUB-180902748,OU=Members,OU=External,DC=aetheq,DC=aetnaeq,DC=com",<br>&nbsp;&nbsp;&nbsp;&nbsp;"assuranceLevel": "http://consumer.aetna.com/assurance/loa-2",<br>&nbsp;&nbsp;&nbsp;&nbsp;"eieHeaderAuthorizedRole": [<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"authorizedRole": "AETH-User-Role-1"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"authorizedRole": "AETH-User-Role-2"<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;&nbsp;&nbsp;],<br>&nbsp;&nbsp;&nbsp;&nbsp;"impersonatingAccountIdentifier": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idSource": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idValue": "POCDevData7",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idType": "accounts"<br>&nbsp;&nbsp;&nbsp;&nbsp;},<br>&nbsp;&nbsp;&nbsp;&nbsp;"accountIdentifier": {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idSource": "1",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idValue": "POCDevData7",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"idType": "accounts"<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>&nbsp;&nbsp;}<br>}``` | JSON | Account Info from LDAP. If impersonation, Roles are present for the CSR (must be AETH). Otherwise, member (must be AETH). Contains CSR Info and Member Info | 
fetch("https://ahwproxy.aetna.com/qaapi03.aetna.com/healthcare/qapath1/v3/consolidatedclaim/find", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "priority": "u=1, i",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site"
    },
    "referrer": "https://qa-health.aetna.com/",
    "body": null,
    "method": "OPTIONS",
    "mode": "cors",
    "credentials": "omit"
});;
fetch("https://ahwproxy.aetna.com/qaapi03.aetna.com/healthcare/qapath1/v3/consolidatedclaim/find", {
    "headers": {
        "accept": "application/json",
        "accept-language": "en-US",
        "authorization": "Bearer AAIkOTg1OWVkMGQtYzBiYy00MzAxLTlmNTEtYWZhYjI2YjE3OGQ0AR9b7BrsxzEFivhc1ddW02ZxwGkuzWPU2DuS5rvOzRQZ1e8bqBSenGApjoDiXQ_eH8MztLKQmfkX7m3psV7H2W_DeikAuX76vxfiHSPOM0cODXSBZKvIIlC8sfpH8ZUhvwAXlZ10zpBNkhE_rYtWUEZfXDgtUqy9zq2R-pcEtUle_tvBMc0oaXzTL8fgOG7fjLJ-CL5-zudnvBHNi3Q-f0hBX9xp1rTsmXKId2nH79RjfgwCormHLS65FTSPq5D5OgLgBixR76yk_NDLnXe0EhLfXkkAOTg8b5yNvOzC3eO3lkx6ZM4IMEkykYPFAipn5RXBiH--yggBIA46NnVhMZvwD10fU_SAe2BdgOEMLHLW57EafUDCvktHxzbCrbnu",
        "cache-control": "no-store no-cache",
        "content-type": "application/json",
        "id_token": "eyJhbGciOiJSUzI1NiJ9.eyJhZV92ZXJzaW9uIjoiMS4xLjAiLCJpc3MiOiJodHRwczovL29wZW5pZC5hZXRuYS5jb20vY29uc3VtZXIiLCJzdWIiOiIxN09ZQ0tMSkhYN1NQQzFTNTNOVUBhZXRuYWUuY29tIiwiYXVkIjoiOTg1OWVkMGQtYzBiYy00MzAxLTlmNTEtYWZhYjI2YjE3OGQ0IiwiZXhwIjoxNzU5NDA5NDg4LCJpYXQiOjE3NTk0MDU4ODgsImdpdmVuX25hbWUiOiJYQVZJRVIiLCJmYW1pbHlfbmFtZSI6IkhVTlRFUiIsImFjciI6Imh0dHA6Ly9jb25zdW1lci5hZXRuYS5jb20vYXNzdXJhbmNlL2xvYS0yIiwiYWVfZGduIjoiQ049RE1ULVMtVzE4NTM1MTU3MixPVT1NZW1iZXJzLE9VPUV4dGVybmFsLERDPWFldGhlcSxEQz1hZXRuYWVxLERDPWNvbSIsImFlX2hjciI6InN1YnNjcmliZXIsbWVtYmVyU3Vic2NyaWJlcjEiLCJhZV9hY2NvdW50SWQiOiIxfmRtdC1zLXcxODUzNTE1NzIiLCJhZV9idXNJbmRJRCI6WyJnbG9iYWxJZGVudGlmaWVyIiwiNjAwMDV-ODAzODA0Nzc2Njc5ODQ4NTQ4NyIsInByZWZlcnJlZFByb3h5SWQiLCIxNX5RRk5WMUJCQkJQWFoiXSwiYWVfaW1wQVVEIjoiIiwiYWVfaW1wSENSIjoiIiwiYWVfaW1wQUNSIjoiIiwiYWVfaW1wREdOIjoiIiwiYWVfaW1wQWNjb3VudElkIjoiIiwiYWVfaW1wQnVzSW5kSUQiOltdLCJhZV9pbXBHcmFudGVkTE9BIjoiIn0.MYkrAMc__5BICuuPmtbIumMDd5Ew3yhsDvXvKZsjrav3RZ2qAPf7-Z4tLjERca8kmlBCcYSYuVNQr9R-4q8V8IVhAtanTO8T1omK9v0I-jpMxTAV-dVzuUDLcl3AvMvW83LJaidfTGsACT9Cgl9-qR3Vh-21lzEd2VRM8v1En5-3NXZN9CVEkZAA9MDKBac2aLMkqqxqx1JoKgXqiVQ9jSR2skpd0UUEHDgTGsguyRAo294ATKfbIABPNwEOAzf0djjeAT9AjNjaU8oQ3DSTzVJlQ-ARc7Jl0FYVdReWmK2gyiy-2T8Z-kiViWqhrwDmmtutRFq84E0jjcVRC80c9A",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-aetna-accept-language": "en-US",
        "x-ibm-client-id": "9859ed0d-c0bc-4301-9f51-afab26b178d4"
    },
    "referrer": "https://qa-health.aetna.com/",
    "body": "{\"lineOfBusinessName\":\"Commercial\",\"planSponsorId\":\"0000000100903903\",\"relationshipToSubscriber\":\"Self\",\"claimType\":\"MED,DEN,PHAR,HEAR,SBH\",\"includeCvsDirectClaims\":true,\"claimStatus\":[\"CMPL\",\"RVSD\",\"INPR\",\"DENY\",\"IREQ\",\"HP\",\"Paid\",\"Final\",\"Denied\"],\"fromDate\":\"2023-10-02T04:00:00.000Z\",\"toDate\":\"2025-10-03T03:59:59.000Z\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
});
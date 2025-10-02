fetch("https://ahwproxy.aetna.com/qaapi03.aetna.com/healthcare/qapath1/v2/pharmacy/prescription/summary/403295314", {
    "headers": {
      "accept": "application/json",
      "accept-language": "en-US",
      "authorization": "Bearer AAIkOTg1OWVkMGQtYzBiYy00MzAxLTlmNTEtYWZhYjI2YjE3OGQ0_GMWO9E2dOL6blwJXC28DGiJ31K4R7C_D9Pldf0uQtgkFOgvxJv78ZHSFMhqTZ_sQCSbOkZIJUGF6jf8gxwSTgwFaBdJ8P9KuehCTOhvumFY6bWALN1t-CbxzPGJ71uXZhl3u5aItqoD_36q0r8iR-lCXd-uQsmQgmmabKWUxD1LE0b3NbJa0ZZvBql6fwdPHilFGwd0P_F0DfPuzBR2wSC9YoQy8hkcrm11SkuvTAPx3XZ3ygeeAPmXrmfDxA8XFOQzavWoMKneaIZPcQLnb07O_EdwNc_fkF8X3f3GFSFvvMYvd9brxYfof6em6rOIkCoThiKrFwhLLnavX8x5mKaQQtFEBGRs5cMEuT2y8VO7Rn_8edO1zJ5ZjI9VjBUz",
      "cache-control": "no-store no-cache",
      "content-type": "application/json",
      "id_token": "eyJhbGciOiJSUzI1NiJ9.eyJhZV92ZXJzaW9uIjoiMS4xLjAiLCJpc3MiOiJodHRwczovL29wZW5pZC5hZXRuYS5jb20vY29uc3VtZXIiLCJzdWIiOiIxN09ZQ0tMSkhYN1NQQzFTNTNOVUBhZXRuYWUuY29tIiwiYXVkIjoiOTg1OWVkMGQtYzBiYy00MzAxLTlmNTEtYWZhYjI2YjE3OGQ0IiwiZXhwIjoxNzU5NDE1NTM0LCJpYXQiOjE3NTk0MTE5MzQsImdpdmVuX25hbWUiOiJYQVZJRVIiLCJmYW1pbHlfbmFtZSI6IkhVTlRFUiIsImFjciI6Imh0dHA6Ly9jb25zdW1lci5hZXRuYS5jb20vYXNzdXJhbmNlL2xvYS0yIiwiYWVfZGduIjoiQ049RE1ULVMtVzE4NTM1MTU3MixPVT1NZW1iZXJzLE9VPUV4dGVybmFsLERDPWFldGhlcSxEQz1hZXRuYWVxLERDPWNvbSIsImFlX2hjciI6InN1YnNjcmliZXIsbWVtYmVyU3Vic2NyaWJlcjEiLCJhZV9hY2NvdW50SWQiOiIxfmRtdC1zLXcxODUzNTE1NzIiLCJhZV9idXNJbmRJRCI6WyJnbG9iYWxJZGVudGlmaWVyIiwiNjAwMDV-ODAzODA0Nzc2Njc5ODQ4NTQ4NyIsInByZWZlcnJlZFByb3h5SWQiLCIxNX5RRk5WMUJCQkJQWFoiXSwiYWVfaW1wQVVEIjoiIiwiYWVfaW1wSENSIjoiIiwiYWVfaW1wQUNSIjoiIiwiYWVfaW1wREdOIjoiIiwiYWVfaW1wQWNjb3VudElkIjoiIiwiYWVfaW1wQnVzSW5kSUQiOltdLCJhZV9pbXBHcmFudGVkTE9BIjoiIn0.VQPCLl8DbrD-62ui3jWa2--REshELHaXHBZWOtcDE9FAoe7wm7s_ZpSUahx95W06Fr8gUBR-Xi1kucfEn9POF7mQM9adpha8vg6XQn5HMDzNKBLQTOEQofYt1FBeCj6qm68_nm2UNSCxE0iWeiqNFySa7e73Y0mCh8Zse_YzrhuRI9HWsQlR-Ux_LwoVcX8XJUjmwCw7mcNNlm8meUEJqagEMnCFdfSqAJXOHD1xg_a76s9gAY7wW088CdiST6ku_0Pq6h8alkujCtiYDNGZNuxxcxgAf1Xgw17YGtSl2kE51mMjVGpyNJVu-ZfSDuFggwNTgTtmrHjGCh-ZSbogZA",
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
    "body": "{\"drug\":{\"drugName\":\"HUMALOG\",\"NDC11\":\"2751017\",\"drugForm\":\"VIA\",\"drugStrength\":\"100U/ML\"},\"membershipResourceId\":\"5~185351572+10+2+20200101+762245+B+2\",\"selectedMemberResourceId\":\"41~185351572\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });
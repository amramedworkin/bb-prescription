curl -X "POST" "https://qaapih3.aetna.com/healthcare/qapath1/v1/features" \
     -H 'X-IBM-CLIENT-ID: e108565c-b8c1-4f4d-9281-cf0b66fc65d6' \
     -H 'ID_Token: eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL29wZW5pZC5hZXRuYS5jb20vY29uc3VtZXIiLCJzdWIiOiIxN09ZQ0tMNVlJRjc1N0xJV0ZINUBhZXRuYWUuY29tIiwiYXVkIjoiZTEwODU2NWMtYjhjMS00ZjRkLTkyODEtY2YwYjY2ZmM2NWQ2IiwiZXhwIjoxNjIwODM5NDk5LCJpYXQiOjE2MjA4MzU4OTksImdpdmVuX25hbWUiOiJKQVZPTlRFIiwiZmFtaWx5X25hbWUiOiJTQ0hPVklMTEUiLCJhY3IiOiJodHRwOi8vY29uc3VtZXIuYWV0bmEuY29tL2Fzc3VyYW5jZS9sb2EtMiIsImFlX2RnbiI6IkNOPURNVC1TLVcxODUxNDExNTYsT1U9TWVtYmVycyxPVT1FeHRlcm5hbCxEQz1hZXRoZXEsREM9YWV0bmFlcSxEQz1jb20iLCJhZV9oY3IiOiJzdWJzY3JpYmVyLG1lbWJlclN1YnNjcmliZXIxIiwiYWVfYWNjb3VudElkIjoiMX5ETVQtUy1XMTg1MTQxMTU2IiwiYWVfdmVyc2lvbiI6IjEuMC4wIn0.qubuhHFxZ6mOqubH5uT1RJa-hHngJM9tZxZVzElFdAaUqsLEW3FMyExTbTRK1GMj7sMcWAIU0zlqHGEpnB2OJa-G9WqAxXlE2-9SveacZw6IAhGVxYlAIXEdGOqUlNLVaHinsh0gjv8NfAe8N-tmhX88AJ7x8ZPm_CwkP1TLbdxLiNoOMeoVHPj2GfmZsTcfFn8blQvTYyEPKhzO9ObNK5aGAV0iUwx022CmxAhzyGjdU1ApIrhtybdDdlk_uS-dE8QkmV1iVDnA8ALvNCw9I-7Sx7Vd25WEvXfzb8IXWVaip2ip_VImIioGksXMTcRNIFPiXoyvS3ssOSXlc5iB4A' \
     -H 'Authorization: Bearer AAIkZTEwODU2NWMtYjhjMS00ZjRkLTkyODEtY2YwYjY2ZmM2NWQ2cjOblDft-3V22MYL8T54M60FHWatlX1Rnf1fmSKJUuHGjITWxT4_ybkhkbikn6uTvwCF2hbg4msITtbR-8wjmqvgt50PSQl6yZAOtJMwgqBVqFo8t0xe_9dp5Sp2E0hphzSEiNdoXWnrAJRCXaWxag' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'
        {
            "enabled": false,
            "memberships": [
                {
                    "membershipResourceId": "5~265688554+10+1+20200101+761878+A+1",
                    "features": []
                },
                {
                    "membershipResourceId": "5~265688554+10+3+20200101+761878+B+2",
                    "features": []
                },
                {
                    "membershipResourceId": "5~265688554+10+4+20200101+761878+C+3",
                    "features": []
                }
            ]
}'
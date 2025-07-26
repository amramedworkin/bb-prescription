1. CVS OpenPlatform calls (POST) /sa/v1/plan-document/list in APIc 03 Gateway passing memberResourceIds
2. APIc 03 Gateway calls (POST) /sa/v1/plan-document/list in CVS BFF passing memberResourceIds
3. CVS BFF calls (POST) /v1/plangroups passing memberResourceIds
4. /v1/plangroups returns 

They don't have any context of the member outside of the token
Token comes through as EIE headers - Plan Groups (portal groups)

APIc Deconstructs the token into the EIE headers
They get passed to the plangroups
Look for the line of business
PlanSponsorID
relationshipToSubscriber
LineOfBusiness = Commercial
    Underneath this we have PirmaryPolicyType
    Policies underneath that
        memberships
            Find the operative membership
            ActivelyCovered
            there is the membershipResourceId
                Call resources with

memberResourceId
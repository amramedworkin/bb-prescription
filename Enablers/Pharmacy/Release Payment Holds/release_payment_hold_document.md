# Release Payment Holds — AWS Flow & SuperApp Back-End Bridge

This document mirrors the look-and-feel of the **Plan Docs List via AWS** diagram and shows how **Release Payment Holds** flows from the Aetna front end through APIc to the **Release Payment Hold BFF**, then bridges to CVS via the **SuperApp back-end** pattern.

---

## Visual References

**A. Plan Docs — AWS Pattern (Reference Style):**  
![Plan Docs AWS](sandbox:/mnt/data/Plan Docs AWS.jpeg)

**B. SuperApp Back End (Used for CVS Calls):**  
![SuperApp back-end to CVS](sandbox:/mnt/data/superapp_plan_docs.png)

> We reuse the same composition: *Member → APIc (Apigee) → Domain BFF* on the AWS side, and *SuperApp integration for CVS calls* on the PBM side.

---

## Release Payment Holds — AWS-Side Flow

1. **Member (Web/Mobile)** opens RX details.  
2. **Aetna Frontend** calls **APIc (Apigee)** using the Aetna namespace:  
   - `GET /v1/release-payment-hold/eligibility?rxId&memberId`  
   - `POST /v1/release-payment-hold/payment-consent`  
   - `POST /v1/release-payment-hold/resolve`  
   - `GET  /v1/release-payment-hold/orders/{orderId}`
3. **APIc** routes to the **Release Payment Hold BFF (Domain Service)** which:  
   - validates request, manages idempotency & telemetry,  
   - orchestrates calls to CVS,  
   - writes **Audit** events and purges **Transient Cache**.

**Triggering condition:** `fillStatusReasonCode = 54` is considered *eligible* for self-serve payment-hold release (CTA rendered).

---

## SuperApp Bridge — CVS Back-End Calls

From the **BFF**, outbound calls to CVS use the `/cvs/` namespace:

- `GET  /cvs/high-cost-hold?rxId&memberId` — eligibility
- `POST /cvs/payment-consent` — tokenized payment + consent
- `POST /cvs/orders/{orderId}/resolve-payment-hold` — authoritative release
- `GET  /cvs/orders/{orderId}` — confirm no holds

Security: mTLS + trace propagation; least-privilege scopes.  
Reliability: retry with **Idempotency-Key** to avoid duplicate effects.  
Observability: `X-Trace-Id` spans FE → APIc → BFF → CVS and back.

---

## Delivered Artifacts

- **Sequence Diagram (PlantUML):** `release_payment_hold_sequence.puml`  
- **Deployment Diagram (PlantUML):** `release_payment_hold_deployment.puml`

Render these with PlantUML or any compatible viewer.

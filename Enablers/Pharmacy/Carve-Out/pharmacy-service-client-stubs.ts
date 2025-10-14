
/**
 * Pharmacy Service client stubs (TypeScript/Fetch).
 * Handles 200 OK, 206 Partial Content, and error envelopes with additional_data.
 */

export interface ErrorEnvelope {
  statusCode: number;
  statusDescription: string;
  additional_data: {
    failure_id?: string;
    failure_reason?: string;
    diagnostics?: Record<string, any>;
    code?: 'PARTIAL_SUCCESS';
    partial?: boolean;
    counts?: Record<string, number>;
    partial_failures?: Array<{
      failure_id: string;
      failure_reason: string;
      diagnostics?: Record<string, any>;
    }>;
  };
  data: any | null;
}

type HeadersInitLike = HeadersInit | Record<string, string>;

export interface ClientOptions {
  baseUrl: string;
  bearerToken: string;
  defaultPartialAs?: 200 | 206; // default 200
}

function buildHeaders(token: string, extra?: HeadersInitLike): Headers {
  const h = new Headers({
    'Authorization': `Bearer ${token}`
  });
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => h.set(k, String(v)));
  }
  return h;
}

function makeUrl(baseUrl: string, path: string, q?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(path, baseUrl);
  if (q) {
    Object.entries(q).forEach(([k, v]) => {
      if (v !== undefined) url.searchParams.set(k, String(v));
    });
  }
  return url.toString();
}

export async function searchPrescriptions(
  opts: ClientOptions,
  body: any,
  startDate: string,
  endDate: string,
  partialAs: 200 | 206 = opts.defaultPartialAs ?? 200
) {
  const headers = buildHeaders(opts.bearerToken, {
    'Content-Type': 'application/json',
    ...(partialAs === 206 ? { 'Prefer': 'partial=206' } : {})
  });
  const url = makeUrl(opts.baseUrl, '/v1/prescriptions/search', {
    startDate, endDate,
    ...(partialAs === 206 ? { partialAs: 206 } : {})
  });
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });

  const isPartial = res.status === 206 || res.headers.get('X-Partial-Result') === 'true';
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  if (res.ok || res.status === 206) {
    return {
      httpStatus: res.status,
      partial: isPartial,
      partialReason: res.headers.get('X-Partial-Reason') ?? json?.additional_data?.code,
      envelope: json
    };
  }

  // Error envelopes
  const err: ErrorEnvelope = json;
  throw Object.assign(new Error(err?.additional_data?.failure_reason || 'Request failed'), {
    httpStatus: res.status,
    envelope: err
  });
}

export async function getPrescriptionDetail(
  opts: ClientOptions,
  claimId: string,
  startDate: string,
  endDate: string
) {
  const headers = buildHeaders(opts.bearerToken);
  const url = makeUrl(opts.baseUrl, `/v1/prescriptions/${encodeURIComponent(claimId)}`, { startDate, endDate });
  const res = await fetch(url, { method: 'GET', headers });
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  if (res.ok) return { httpStatus: res.status, envelope: json };

  const err: ErrorEnvelope = json;
  throw Object.assign(new Error(err?.additional_data?.failure_reason || 'Request failed'), {
    httpStatus: res.status,
    envelope: err
  });
}

export async function evaluateVisibility(
  opts: ClientOptions,
  body: any,
  startDate: string,
  endDate: string,
  partialAs: 200 | 206 = opts.defaultPartialAs ?? 200
) {
  const headers = buildHeaders(opts.bearerToken, {
    'Content-Type': 'application/json',
    ...(partialAs === 206 ? { 'Prefer': 'partial=206' } : {})
  });
  const url = makeUrl(opts.baseUrl, '/v1/visibility/evaluate', {
    startDate, endDate,
    ...(partialAs === 206 ? { partialAs: 206 } : {})
  });
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });

  const isPartial = res.status === 206 || res.headers.get('X-Partial-Result') === 'true';
  const text = await res.text();
  const json = text ? JSON.parse(text) : {};

  if (res.ok || res.status === 206) {
    return {
      httpStatus: res.status,
      partial: isPartial,
      partialReason: res.headers.get('X-Partial-Reason') ?? json?.additional_data?.code,
      envelope: json
    };
  }

  const err: ErrorEnvelope = json;
  throw Object.assign(new Error(err?.additional_data?.failure_reason || 'Request failed'), {
    httpStatus: res.status,
    envelope: err
  });
}

/** Example usage */
async function example() {
  const client: ClientOptions = {
    baseUrl: 'https://sandbox.aetnahealth.example.com',
    bearerToken: 'REPLACE_WITH_JWT',
    defaultPartialAs: 206
  };

  // Search with 206 toggle
  const searchBody = {
    membershipResourceIds: ['5~263801696+31+1+20180101+788678+C+3'],
    options: { applyPrivacy: true, applyFamilyAccess: true, applyDeduplication: true, requireAttestation: true }
  };
  const searchRes = await searchPrescriptions(client, searchBody, '2019-01-01', '2019-12-31');
  console.log('searchRes', searchRes.httpStatus, searchRes.partial, searchRes.partialReason);

  // Evaluate with 200 semantics (override)
  const evalBody = {
    memberContext: {
      membershipResourceIds: ['5~263801696+31+1+20180101+788678+C+3'],
      attestation: { cvsrxCarveOut: true }
    },
    claims: [{
      claimNumber: '200023611694001',
      uniqueRxId: '9751485501674528227',
      fillDate: '2019-08-12',
      membershipResourceId: '5~263801696+31+1+20180101+788678+C+3'
    }],
    options: { applyPrivacy: true, applyFamilyAccess: true, applyDeduplication: true }
  };
  const evalRes = await evaluateVisibility(client, evalBody, '2019-01-01', '2019-12-31', 200);
  console.log('evalRes', evalRes.httpStatus, evalRes.partial, evalRes.partialReason);
}

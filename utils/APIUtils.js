// utils/APIUtils.js
import { request, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in';
const API_KEY = 'reqres-free-v1';

// ---- In-memory token store (per worker) ----
let _token = null;
export function getToken() { return _token; }
export function setToken(token) { _token = typeof token === 'string' && token.length ? token : null; }
export function clearToken() { _token = null; }

/** Create isolated APIRequestContext (no global config). */
export async function createApi(opts = {}) {
    const { auth = false, extraHeaders = {} } = opts;
    const headers = {
        'x-api-key': API_KEY,
        'content-type': 'application/json',
        ...extraHeaders,
    };
    if (auth && _token) headers['Authorization'] = `Bearer ${_token}`;
    return await request.newContext({ baseURL: BASE_URL, extraHTTPHeaders: headers });
}

/** Version-safe status assertion (works without toHaveStatus). */
export function expectStatus(res, code) {
    expect(res.status(), `Expected HTTP ${code}, got ${res.status()}`).toBe(code);
}

/** Minimal JSON assertion helper. */
export async function expectJson(res, checks = () => { }) {
    const ct = res.headers()['content-type'] || '';
    expect(ct).toMatch(/application\/json/i);
    const body = await res.json();
    expect(typeof body).toBe('object');
    await checks(body);
    return body;
}

/** Login and persist token in module scope. */
export async function loginAndStoreToken(creds, options = {}) {
    const { api = null } = options;
    const ctx = api || (await createApi());
    const res = await ctx.post('/api/login', { data: creds });
    expectStatus(res, 200);
    const json = await expectJson(res, (j) => {
        expect(j).toHaveProperty('token');
        expect(typeof j.token).toBe('string');
        expect(j.token.length).toBeGreaterThan(0);
    });
    setToken(json.token);
    if (!api) await ctx.dispose();
    return json.token;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

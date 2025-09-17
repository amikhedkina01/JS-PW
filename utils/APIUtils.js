// Централізовані хелпери для Playwright API тестів (JS)

import { request, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in';
const API_KEY = 'reqres-free-v1'; // x-api-key

// ---- In-memory token store (per worker process) ----
let _token = null;

/**
 * Повертає поточний токен (або null).
 */
export function getToken() {
    return _token;
}

/**
 * Встановлює токен вручну (рядок або null).
 */
export function setToken(token) {
    _token = typeof token === 'string' && token.length ? token : null;
}

/**
 * Скидає токен.
 */
export function clearToken() {
    _token = null;
}

/**
 * Створює ізольований APIRequestContext без глобальних налаштувань.
 * @param {Object} [opts]
 * @param {boolean} [opts.auth=false] додати Authorization з токеном (якщо є)
 * @param {Object} [opts.extraHeaders] довільні додаткові заголовки
 * @returns {Promise<import('@playwright/test').APIRequestContext>}
 */
export async function createApi(opts = {}) {
    const { auth = false, extraHeaders = {} } = opts;
    const headers = {
        'x-api-key': API_KEY,
        'content-type': 'application/json',
        ...extraHeaders,
    };
    if (auth && _token) {
        headers['Authorization'] = `Bearer ${_token}`;
    }
    return await request.newContext({
        baseURL: BASE_URL,
        extraHTTPHeaders: headers,
    });
}

/**
 * Мінімальна перевірка JSON-відповіді + можливість додаткових асертів.
 * @param {import('@playwright/test').APIResponse} res
 * @param {(json: any) => void|Promise<void>} [checks]
 * @returns {Promise<any>} розпарсене тіло
 */
export async function expectJson(res, checks = () => { }) {
    const ct = res.headers()['content-type'] || '';
    expect(ct).toMatch(/application\/json/i);
    const body = await res.json();
    expect(typeof body).toBe('object');
    await checks(body);
    return body;
}

/**
 * Логіниться та зберігає токен у локальному сторі.
 * Якщо логін успішний — токен доступний через getToken() і буде використаний у createApi({auth:true}).
 * @param {Object} creds { email: string, password: string }
 * @param {Object} [options] передати свій request context або хедери
 * @param {import('@playwright/test').APIRequestContext} [options.api] існуючий контекст; якщо не задано — буде створений тимчасовий
 * @returns {Promise<string>} токен
 */
export async function loginAndStoreToken(creds, options = {}) {
    const { api = null } = options;
    const ctx = api || (await createApi());
    const res = await ctx.post('/api/login', { data: creds });
    await expect(res).toHaveStatus(200);
    const json = await expectJson(res, (j) => {
        expect(j).toHaveProperty('token');
        expect(typeof j.token).toBe('string');
        expect(j.token.length).toBeGreaterThan(0);
    });
    setToken(json.token);

    if (!api) await ctx.dispose();
    return json.token;
}

/**
 * Корисна пауза (іноді для ідемпотентності/mock).
 */
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

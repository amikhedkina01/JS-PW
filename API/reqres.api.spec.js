// tests/reqres.api.spec.js
import { test, expect } from '@playwright/test';
import {
    createApi,
    expectJson,
    loginAndStoreToken,
    getToken,
    clearToken,
    sleep,
} from '../utils/APIUtils.js';

test.describe('Reqres API smoke (independent tests, helpers via utils)', () => {
    // Один раз логінимося перед сьютом і тримаємо токен у сторі утиліти.
    test.beforeAll(async () => {
        clearToken();
        await loginAndStoreToken({
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        });
        // Не обовʼязково для reqres, але показуємо сценарій із bearer.
        expect(getToken()).toBeTruthy();
    });

    test('POST /api/register — successful registration returns id & token', async () => {
        const api = await createApi(); // без auth
        const payload = { email: 'eve.holt@reqres.in', password: 'pistol' };

        const res = await api.post('/api/register', { data: payload });
        await expect(res).toHaveStatus(200);

        await expectJson(res, (json) => {
            expect(json).toHaveProperty('id');
            expect(Number.isInteger(json.id)).toBeTruthy();
            expect(json).toHaveProperty('token');
            expect(typeof json.token).toBe('string');
            expect(json.token.length).toBeGreaterThan(0);
        });

        await api.dispose();
    });

    test('POST /api/login — successful login stores token', async () => {
        // показово робимо ще один логін і перекриваємо токен
        const api = await createApi();
        const resToken = await loginAndStoreToken(
            { email: 'eve.holt@reqres.in', password: 'cityslicka' },
            { api }
        );
        expect(resToken).toBe(getToken());
        await api.dispose();
    });

    test('GET /api/users/2 — returns expected user shape (with auth header applied)', async () => {
        const api = await createApi({ auth: true }); // якщо токен є — піде як Bearer
        const res = await api.get('/api/users/2');
        await expect(res).toHaveStatus(200);

        await expectJson(res, (json) => {
            expect(json).toHaveProperty('data');
            const u = json.data;
            expect(u).toMatchObject({
                id: expect.any(Number),
                email: expect.any(String),
                first_name: expect.any(String),
                last_name: expect.any(String),
                avatar: expect.any(String),
            });
            expect(u.email).toContain('@');
        });

        await api.dispose();
    });

    test('PATCH /api/users/2 — partial update echoes fields & updates timestamp', async () => {
        const api = await createApi({ auth: true });
        const update = { job: 'Senior QA', cat_pref: 'likes tuna' };

        const res = await api.patch('/api/users/2', { data: update });
        await expect(res).toHaveStatus(200);

        const body = await expectJson(res, (json) => {
            expect(json).toHaveProperty('job', update.job);
            expect(json).toHaveProperty('cat_pref', update.cat_pref);
            expect(json).toHaveProperty('updatedAt');
            expect(typeof json.updatedAt).toBe('string');
        });
        expect(() => new Date(body.updatedAt).toISOString()).not.toThrow();

        await api.dispose();
    });

    test('DELETE /api/users/2 — returns 204 and empty body', async () => {
        const api = await createApi({ auth: true });

        const res = await api.delete('/api/users/2');
        await expect(res).toHaveStatus(204);
        const text = await res.text();
        expect(text).toBe('');

        await sleep(100);
        const res2 = await api.delete('/api/users/2');
        await expect(res2).toHaveStatus(204);

        await api.dispose();
    });
});

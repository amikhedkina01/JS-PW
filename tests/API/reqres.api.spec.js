// tests/reqres.api.spec.js
import { test, expect } from '@playwright/test';
import {
    createApi,
    expectJson,
    loginAndStoreToken,
    getToken,
    clearToken,
    sleep,
    expectStatus,
} from '../../utils/APIUtils.js';
import { tags } from '../../data/tags.js';


test.describe('Reqres API smoke (independent tests, helpers via utils)', () => {

    test.beforeAll(async () => {
        clearToken();
        await loginAndStoreToken({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
        expect(getToken()).toBeTruthy();

    });

    test('POST /api/register — successful registration returns id & token', { tags: [tags.API] }, async () => {
        const api = await createApi(); // no auth required
        const res = await api.post('/api/register', { data: { email: 'eve.holt@reqres.in', password: 'pistol' } });
        expectStatus(res, 200);

        await expectJson(res, (json) => {
            expect(json).toHaveProperty('id');
            expect(Number.isInteger(json.id)).toBeTruthy();
            expect(json).toHaveProperty('token');
            expect(typeof json.token).toBe('string');
            expect(json.token.length).toBeGreaterThan(0);
        });
        await api.dispose();
    });

    test('POST /api/login — successful login stores token', { tags: [tags.API] }, async () => {
        const api = await createApi();
        const resToken = await loginAndStoreToken(
            { email: 'eve.holt@reqres.in', password: 'cityslicka' },
            { api }
        );
        expect(resToken).toBe(getToken());
        await api.dispose();
    });

    test('GET /api/users/2 — returns expected user shape (with auth header applied)', { tags: [tags.API] }, async () => {
        const api = await createApi({ auth: true });
        const res = await api.get('/api/users/2');
        expectStatus(res, 200);

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

    test('PATCH /api/users/2 — partial update echoes fields & timestamp', { tags: [tags.API] }, async () => {
        const api = await createApi({ auth: true });
        const res = await api.patch('/api/users/2', { data: { job: 'Senior QA', cat_pref: 'likes tuna' } });
        expectStatus(res, 200);

        const body = await expectJson(res, (json) => {
            expect(json).toHaveProperty('job', 'Senior QA');
            expect(json).toHaveProperty('cat_pref', 'likes tuna');
            expect(json).toHaveProperty('updatedAt');
            expect(typeof json.updatedAt).toBe('string');
        });
        expect(() => new Date(body.updatedAt).toISOString()).not.toThrow();
        await api.dispose();
    });

    test('DELETE /api/users/2 — returns 204 and empty body', { tags: [tags.API] }, async () => {
        const api = await createApi({ auth: true });

        const res = await api.delete('/api/users/2');
        expectStatus(res, 204);
        expect(await res.text()).toBe('');

        await sleep(100);
        const res2 = await api.delete('/api/users/2');
        expectStatus(res2, 204);
        await api.dispose();
    });
});

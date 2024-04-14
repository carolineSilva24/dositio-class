import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe('##Tests for routes PUT', async(t) => {
    test('# PUT /products/1c', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/products/1c',
                body: {
                    "name": "Pastel",
                    "qtd": 6,
                    "category": "Comida"
                },
                headers: {
                    "isadmin": "true",
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
                }
            });

            equal(response.statusCode, 204);
        });

        test('# PUT /categories/1d', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'PUT',
                url: '/categories/1d',
                body: {
                    "name": "Fruta",
                    "img_url": "teste"
                },
                headers: {
                    "isadmin": "true",
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
                }
            });

            equal(response.statusCode, 204);
        });
})
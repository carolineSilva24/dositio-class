import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe('##Tests for existence functions', async(t) => {
    test('# POST /products', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/products',
            body: {
                "_id": "1c",
                "name": "Pastel",
                "qtd": 6,
                "category": "Comida"
            },
            headers: {
                    "isadmin": "true",
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
                }
        });
        
        equal(response.statusCode, 412);
    })

    test('# POST /categories', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/categories',
            body: {
                "_id": "1d",
                "name": "Fruta",
                "img_url": "teste"
            },
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
            }
        });
        
        equal(response.statusCode, 412);
    })

    test('# POST /register', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/register',
            body: {
                "_id": "1b",
                "username": "Caroline",
                "password": "Abcd@1234",
                "isAdmin": true
            }
        });
        
        equal(response.statusCode, 412);
    })
})
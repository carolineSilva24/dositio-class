import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe('##Tests for routes POST', async(t) => {
    test('# POST /auth', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/auth',
            body: {
                "_id": "1a",
                "username": "Caroline",
                "password": "Abcd@1234"
            }
        });

        equal(response.statusCode, 200);
    });
    
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

        equal(response.statusCode, 201);
    });

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
                "name": "Água",
                "qtd": 10,
                "category": "Bebida"
            },
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
            }
        });

        equal(response.statusCode, 201);
    });

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
                "name": "Bebida",
                "img_url": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpet.agro.ufg.br%2Fn%2F129817-bebidas-e-suas-classificacoes&psig=AOvVaw2NIbH6YqfJ7RMFhroW31L6&ust=1713154326083000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCygarrwIUDFQAAAAAdAAAAABAE"
            },
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
            }
        });

        equal(response.statusCode, 201);
    });
})
import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe('##Tests for routes GET', async(t) => {
    test('# GET /products', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/products'
        });

        equal(response.statusCode, 200);
    });

    test('# GET /products/:1c', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/products/1c'
        });

        equal(response.statusCode, 200);
    });

    test('# GET /categories', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/categories'
        });

        equal(response.statusCode, 200);
    });

    test('# GET /categories/1d', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/categories/1d'
        });

        equal(response.statusCode, 200);
    });

    test('# GET /categories/1d/products', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'GET',
            url: '/categories/1d/products'
        });

        equal(response.statusCode, 200);
    });
})
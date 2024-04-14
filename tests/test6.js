import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe("##Testes for error routes", async(t) => {
    describe('#Notfound/Internal Server Error', async (t) => {
        test('# GET / for Internal Server Error', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/'
            });

            equal(response.statusCode, 500);
        })


        test('# GET /error', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/error'
            });

            equal(response.statusCode, 501);
        })

        test('# GET /notfound', async (t) => {
            const app = await build(options);

            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/notfound'
            });

            equal(response.statusCode, 404);
        })
    });
})
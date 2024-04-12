import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://127.0.0.1:27017/dositio');
    });
});

describe('###Tests for routes', async(t) => {
    
    describe('##Routes GET', async(t) => {
        test('# GET /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /categories/66195eef67e79ee6278193a0', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/66195eef67e79ee6278193a0'
            });

            equal(response.statusCode, 200);
        });
    });

    describe('##Not found routes', async(t) => {
        describe('# Error route', async(t) => {
            test('# GET /error', async(t) => {
                const app = await build(options);

                t.after(async() => {
                    await app.close();
                });
                const response = await app.inject({
                    method: 'GET',
                    url: '/error'
                });

                equal(response.statusCode, 501);             
                })

                test('# GET /notfound', async(t) => {
                    const app = await build(options);
    
                    t.after(async() => {
                        await app.close();
                    });
                    const response = await app.inject({
                        method: 'GET',
                        url: '/notfound'
                    });
    
                    equal(response.statusCode, 404);             
                    })
        })
    });
});

describe('###Tests for Authenticated routes', async(t) => {

});
import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';


test('##Testing options configuration file', async (t) => {
    const app = await build(options);

    t.after(async () => {
        await app.close();
    });
    deepEqual(options.stage, 'test');
    deepEqual(options.port, '3000');
    deepEqual(options.host, '127.0.0.1');
    deepEqual(options.jwt_secret, 'Abcd@1234');
    deepEqual(options.db_url, 'mongodb://127.0.0.1:27017/dositio');
});

describe("##Suit to test /user(register/auth) API", async (t) => {
    test('#POST /register', async (t) => {
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

    test('#POST /auth', async (t) => {
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

  describe("##Suit to test checkExistence", async (t) => {
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
})

describe("##Suit to test /products(token errors) API", async (t) => {

    test('#POST /products', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/products',
            body: {
                "_id": "1c",
                "name": "Milkshake",
                "qtd": 10,
                "category": "Bebida"
            },
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo"
            }
        });

        equal(response.statusCode, 201);
    });

    test('#GET /products', async (t) => {
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

    test('#GET /products/1c', async (t) => {
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

    test('#PUT /products/1c', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/products/1c',
            body: {
                "name": "Água",
                "qtd": 6,
                "category": "Bebida"
            },
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo",
                "isadmin": "true"
            }
        });

        equal(response.statusCode, 204);
    });

    describe("##Suit to test checkExistence", async (t) => {
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
                    "qtd": 6,
                    "category": "Bebida"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo",
                    "isadmin": "true"
                }
            });
    
            equal(response.statusCode, 412);
        })
      });

      describe("##Suit to test token errors", async (t) => {
        test('# POST /products INVALID_TOKEN', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: {
                    "_id": "2a",
                    "name": "Pao",
                    "qtd": 5,
                    "category": "Comida"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1p2VybmFtZSI6Im9sYSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzEzMTA4MzgyfQ.nyyomICaV7k7H_CpgK0AbgGXgvhAUc8iezt4n2M87M0.eyJ1p2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4",
                    "isadmin": "true"
                }
            });
    
            equal(response.statusCode, 401);
        })
    
        test('# POST /products NO_TOKEN', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: {
                    "_id": "2a",
                    "name": "Pao",
                    "qtd": 5,
                    "category": "Comida"
                },
                headers: {
                    "isadmin": "true"
                }
            });
    
            equal(response.statusCode, 401);
        })
    
        test('# POST /products UNAUTHORIZED_PERSONNEL', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: {
                    "_id": "2a",
                    "name": "Pao",
                    "qtd": 5,
                    "category": "Comida"
                },
                headers: {
                    "isadmin": "false",
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcm5lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMzE4NDI5Mn0.3M0RSpjVOJYbnlt8ZgDq-I0a_Gx2jN2K6QEvNEPxXXI"
                 }
            });
    
            deepEqual(response.statusCode, 401);
        })
      });
});

describe("##Suit to test /categories API", async (t) => {

    test('#POST /categories', async (t) => {
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
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo"
            }
        });

        equal(response.statusCode, 201);
    });

    test('#GET /categories', async (t) => {
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

    test('#GET /categories/1d', async (t) => {
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

    test('#GET /categories/1d/products', async (t) => {
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

    test('#PUT /categories/1d', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/categories/1d',
            body: {
                "name": "Bebida",
                "img_url": "teste"
            },
            headers: {
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo",
                "isadmin": "true"
            }
        });

        equal(response.statusCode, 204);
    });

    describe("##Suit to test checkExistence", async (t) => {
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
                    "img_url": "teste"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo",
                    "isadmin": "true"
                }
            });
    
            equal(response.statusCode, 412);
        })
      });
    

});

describe("##Suit to test errors", async (t) => {

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

describe('##Suits to test DELETE ', async(t) => { 
    test('# DELETE /products/1c', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/products/1c',
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo"
            }
        });

        equal(response.statusCode, 204);
    });

    test('# DELETE /categories/1d', async (t) => {
        const app = await build(options);

        t.after(async () => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/categories/1d',
            headers: {
                "isadmin": "true",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMTgxMjgwfQ.NrrmLxuD9-We9XmXHyzIJjzMhYXdrinN-M3wLRZoMWo"
            }
        });

        equal(response.statusCode, 204);
    });
 });
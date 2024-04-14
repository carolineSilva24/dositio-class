import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

describe('###Tests for Server Configuration', async (t) => {
    test('Testing options configuration file', async (t) => {
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
});

describe('###Tests for routes', async (t) => {
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

    describe("##Tests for routes DELETE", async(t) => {
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
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
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
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4"
                }
            });
    
            equal(response.statusCode, 204);
        });
    })

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

    describe('##Tests for unauthenticated routes', async (t) => {
        test('# POST /products INVALID_TOKEN', async (t) => {
            const app = await build(options);
    
            t.after(async () => {
                await app.close();
            });
            const response = await app.inject({
                method: 'POST',
                url: '/products',
                body: {
                    "_id": "2c",
                    "name": "Pao",
                    "qtd": 5,
                    "category": "Comida"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9sYSIsImlzQWRtaW4iOiJ0cnVlIiwiaWF0IjoxNzEzMTA4MzgyfQ.nyyomICaV7k7H_CpgK0AbgGXgvhAUc8iezt4n2M87M0.eyJ1c2VybmFtZSI6IkNhcm9saW5lIiwiaWF0IjoxNzEzMDQxNDgzfQ.sCSpGc0RCVvp7jz9lPvEJYVfaZsmbB12AWKs3LJ1BX4",
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
                    "_id": "2c",
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
                    "_id": "2c",
                    "name": "Pao",
                    "qtd": 5,
                    "category": "Comida"
                },
                headers: {
                    "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hcm5lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMzEwODcyMn0.TsaoR6yXiYjqDN2jXU0MED2g6AW4V90TtNFeMGShXuE",
                    "isadmin": "false"
                }
            });
            
            equal(response.statusCode, 401);
        }) 
    });
});



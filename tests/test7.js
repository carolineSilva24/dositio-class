import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';


describe('###Tests for unauthenticated routes', async (t) => {
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
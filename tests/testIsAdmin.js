import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from '../app.js';

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
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1p2VybmFtZSI6Ik1hcm5lIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMzEwODcyMn0.TsaoR6yXiYjqDN2jXU0MED2g6AW4V90TtNFeMGShXuE",
            "isadmin": "false"
        }
    });

    deepEqual(response.statusCode, 401);
})
/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function register(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const users = app.mongo.db.collection('users');

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    username: { type: 'string' },
                    password: { type: 'string' },
                    isAdmin: { type: 'boolean' }
                },
                required: ['username', 'password', 'isAdmin']
            }
        },
        config: {
            requireAuthentication: false
        }
    }, async (request, reply) => {
        let user = request.body;
        
        await users.insertOne(user);

        return reply.code(201).send();
    });

    
}
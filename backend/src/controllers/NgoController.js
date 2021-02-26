const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ngos = await connection('ngos').select('*');

        return response.json(ngos);
    },
    async create(request, response) {
        const { name, email, phone, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('hex');

        await connection('ngos').insert({
            id,
            name,
            email,
            phone,
            city,
            uf
        })

        return response.json({ id });
    }
}   

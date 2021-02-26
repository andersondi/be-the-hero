const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ngo = await connection('ngos')
      .where('id', id)
      .select('name')
      .first();

    if (!ngo) {
      return response.status(400).json({ error: 'No NGO with this id was found' });
    }
    return response.json(ngo);
  }
}
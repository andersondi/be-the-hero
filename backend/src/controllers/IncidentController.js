const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    response.header('X-Total-Count', count['count(*)']);

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.email',
        'ngos.phone',
        'ngos.city',
        'ngos.uf'
      ])
      .limit(5)
      .offset((page - 1) * 5);

    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;

    const ngo_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;

    const ngo_id = request.headers.authorization;

    const incident = await connection('incidents')
      .select('ngo_id')
      .where('id', id)
      .first();

    console.log(ngo_id);
    console.log(incident.ngo_id);
    if (incident.ngo_id != ngo_id) {
      return response.status(401)
        .json({
          error: 'Operation not allowed'
        });
    }
    await connection('incidents')
      .where('id', id)
      .delete();

    return response.status(204).send();
  }
}
const express = require('express');
const bodyParser = require('body-parser');

const NgoController = require('./controllers/NgoController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
const jsonParser = bodyParser.json();

routes.post('/sessions', jsonParser, SessionController.create);

routes.get('/nogs', NgoController.index);
routes.post('/nogs', jsonParser, NgoController.create);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', jsonParser, IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('profile', ProfileController.index);

module.exports = routes;

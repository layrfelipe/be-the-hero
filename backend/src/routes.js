const express = require ("express");
const routes = express.Router();

// importação dos controladores que contém as regras de negócio de cada rota
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

// rota que faz o login (cria uma sessão pra ong)
routes.post("/sessions", SessionController.create);

// rotas que cadastram e listam ongs
routes.post("/ongs", OngController.create);
routes.get('/ongs', OngController.index);

/*
rota que lista os casos de uma ong especifica (controlador separado pois o padrão MVC só permite 5 métodos:
    - criação
    - indexação
    - indexação específica da entidade
    - alteração
    - exclusão
*/
routes.get("/profile", ProfileController.index);

// rotas que cadastram, listam e deletam casos
routes.post("/incidents", IncidentController.create);
routes.get("/incidents", IncidentController.index);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
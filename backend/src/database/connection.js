const knex = require("knex");
const configuration = require("../../knexfile");

// conexão ao banco de dados no ambiente de desenvolvimento (ainda existem o de testes e o de produção)
const connection = knex(configuration.development);

module.exports = connection;
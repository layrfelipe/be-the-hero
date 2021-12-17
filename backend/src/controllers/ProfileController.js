const connection = require("../database/connection");

module.exports = {
    async index (req, res) {
        // recebe a autenticação da ong logada pelo cabeçalho da requisição
        const ong_id = req.headers.authorization;

        // seleciona os casos da ong autenticada
        const incidents = await connection("incidents")
            .where("ong_id", ong_id)
            .select("*");

        return res.json(incidents)
    }
}
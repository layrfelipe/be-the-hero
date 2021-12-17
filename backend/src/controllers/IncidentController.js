const { response } = require("express");
const connection = require("../database/connection");

module.exports = {
    async create (req, res) {
        // recebe e desestrutura os dados para cadastro passados pelo corpo da requisição
        const { title, description, value } = req.body;

        // recebe a autenticação da ong logada pelo cabeçalho da requisição
        const ong_id = req.headers.authorization;

        // desestrutura o array para receber somente o valor da variavel id como retorno da inserção no banco de dados
        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async index (req, res) {
        const { page = 1 } = req.query;

        const [ count ] = await connection("incidents").count();
        
        const incidents = await connection("incidents")
            .join("ongs", "ongs.id", "=", "incidents.ong_id")
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                "incidents.*",
                "ongs.name",
                "ongs.email",
                "ongs.whatsapp",
                "ongs.city",
                "ongs.uf"]);

        res.header("X-Total-Count", count["count(*)"]);
        
        return res.json(incidents)
    },

    async delete (req, res) {
        // recebe o id da ong a ser deletada como um recurso da rota na url
        const { id } = req.params;

        // autentica a ong que deseja ser deletada
        const ong_id = req.headers.authorization;

        // procura pela ong ja autenticada
        const incident = await connection("incidents")
            .where("id", id)
            .select("ong_id")
            .first();

        // se uma ong quer apagar outra... nao pode!!
        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: "Operation not permitted."});
        }

        // se passou da condicao de erro... apagando a ong
        await connection("incidents")
            .where("id", id)
            .delete();
        
        // status sem corpo
        return res.status(204).send();
    }
}
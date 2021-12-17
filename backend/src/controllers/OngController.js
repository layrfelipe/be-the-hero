const connection = require("../database/connection");
const crypto = require("crypto");

module.exports = {
    async create (req, res) {
        // recebe e desestrutura os dados passados para cadastro pelo corpo da requisição
        const { name, email, whatsapp, city, uf } = req.body;

        // gera um id aleatório
        const id = crypto.randomBytes(4).toString('HEX');

        // adiciona a ong ao banco de dados
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return res.json({ id });
    },

    // lista todas as ongs cadastradas
    async index (req, res) {
        const ongs = await connection('ongs').select('*');
        return res.json(ongs);
    }
}
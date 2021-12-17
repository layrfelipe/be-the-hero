const connection = require("../database/connection");

module.exports = {
    async create (req, res) {
        // recebe o id no corpo da requisição
        const { id } = req.body;

        // seleciona a ong que tem o id passado
        const ong = await connection("ongs")
            .where("id", id)
            .select("name")
            .first();
        
        if (!ong) {
            return res.status(400).json({ error: "No ONG found with this ID." });
        }

        return res.json(ong);
    }
}
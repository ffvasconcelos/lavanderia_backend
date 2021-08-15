const { response } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	password: "12345",
	database: "la_vanderia",
	port: "5432",
});

const getCustosByLavanderia = async (req, res) => {
	const cnpj = req.params.cnpj;

	try {
		const response = await pool.query(
			"SELECT * FROM CUSTOS WHERE CNPJ_LAVANDERIA = $1",
			[cnpj]
		);
		console.log("Get custos by lavanderia success!");
		res.json(response.rows);
	} catch (err) {
		res.json(err);
	}
};

const insertCustos = async (req, res) => {
	const request = req.body;

	try {
		const response = await pool.query(
			"INSERT INTO CUSTOS (DESPESA, CUSTO_MAO, CUSTO_MAQUINA, CUSTO_SECO, LUCRO_ESPERADO, CNPJ_LAVANDERIA) VALUES ($1, $2, $3, $4, $5, $6)",
			[
				request.despesa,
				request.custo_mao,
				request.custo_maquina,
				request.custo_seco,
				request.lucro_esperado,
				request.cnpj_lavanderia,
			]
		);
		console.log("Insert custos success!");
		res.json("Custo adicionado!");
	} catch {
		console.log(err)
	}
};

const updateCustos = async (req, res) => {
	const request = req.body;

	try {
		const response = await pool.query(
			"UPDATE CUSTOS SET DESPESA = $1, CUSTO_MAO = $2, CUSTO_MAQUINA = $3, CUSTO_SECO = $4, LUCRO_ESPERADO = $5 WHERE CNPJ_LAVANDERIA = $6",
			[
				request.despesa,
				request.custo_mao,
				request.custo_maquina,
				request.custo_seco,
				request.lucro_esperado,
				request.cnpj_lavanderia,
			]
		);
		console.log("Update custos success!");
		res.json("Custos atualizados com sucesso!");
	} catch (err) {
		res.json(err);
	}
};

const deleteCustos = async (req, res) => {
	const cnpj = req.params.cnpj;

	try {
		const response = await pool.query(
			"DELETE FROM CUSTOS WHERE CNPJ_LAVANDERIA = $1", [cnpj]
		)
		console.log("Custo deletado!");
		res.json("Custo deletado com sucesso!");
	} catch (err) {
		res.json(err);
	}
};

module.exports = {
	getCustosByLavanderia,
	insertCustos,
	updateCustos,
	deleteCustos,
};

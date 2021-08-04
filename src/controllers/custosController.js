const { response, query } = require("express");
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
	const { custo_fixo, custo_quilo, tipo, lucro, cnpj_lavanderia } = req.body;

	const response = await pool.query(
		"INSERT INTO CUSTOS (CUSTO_FIXO, CUSTO_QUILO, TIPO, LUCRO, CNPJ_LAVANDERIA) VALUES ($1, $2, $3, $4, $5)",
		[custo_fixo, custo_quilo, tipo, lucro, cnpj_lavanderia]
	);
	console.log("Insert custos success!");
	res.json("Custo adicionado!");
};

const updateCustos = async (req, res) => {
	const { custo_fixo, custo_quilo, tipo, lucro, cnpj_lavanderia } = req.body;

	try {
		const response = await pool.query(
			"UPDATE CUSTOS SET CUSTO_FIXO = $1, CUSTO_QUILO = $2, LUCRO = $3 WHERE CNPJ_LAVANDERIA = $4 AND TIPO = $5",
			[custo_fixo, custo_quilo, lucro, cnpj_lavanderia, tipo]
		);
		console.log("Update custos success!");
		res.json("Custos atualizados com sucesso!");
	} catch (err) {
		res.json(err);
	}
};

const deleteCustos = async (req, res) => {
	const { custo_fixo, custo_quilo, tipo, lucro, cnpj_lavanderia } = req.body;

	try {
		const response = await pool.query(
			"DELETE FROM CUSTOS WHERE CNPJ_LAVANDERIA = $1 AND TIPO = $2", [cnpj_lavanderia, tipo]
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

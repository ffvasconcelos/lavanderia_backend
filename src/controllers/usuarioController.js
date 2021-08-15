const { response } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	password: "12345",
	database: "la_vanderia",
	port: "5432",
});

const getAllUsuarios = async (req, res) => {
	try {
		const response = await pool.query("SELECT * FROM USUARIO");
		res.status(200).json(response.rows);
		console.log("All users sent concluded!");
	} catch (err) {
		res.json(err)
	}
};

const getUsuarioByCPF = async (req, res) => {
	const cpf = req.params.cpf;

	try {
		const response = await pool.query("SELECT * FROM USUARIO WHERE CPF = $1", [
		cpf,
		]);
		console.log('Get usuario concluded!')
		res.json(response.rows);
	} catch (err) {
		res.json(err)
	}
	
};

const getAllUsuariosByCNPJ_LAVANDERIA = async (req, res) => {
	const cnpj = req.params.cnpj;

	try {
		const response = await pool.query(
		"SELECT * FROM USUARIO WHERE CNPJ_LAVANDERIA = $1",
		[cnpj]
		);
		console.log(`Get all usuarios by cnpj_lavanderia = ${cnpj} concluded!`)
		res.json(response.rows);
	} catch (err) {
		res.json(err)
	}
};

const createUsuario = async (req, res) => {
	const request = req.body;

	try {
		await pool.query(
			"INSERT INTO USUARIO(NOME, SENHA, TELEFONE, CPF, CNPJ_LAVANDERIA) VALUES($1, $2, $3, $4, $5)",
			[request.nome, request.senha, request.telefone, request.cpf, request.cnpj_lavanderia]
		);
		console.log(response);
		res.json({
			message: "Usuario criado com sucesso",
			body: {
				...request
			},
		});
	} catch (err) {
		console.log(response);
		res.json({
			message:
				"Um erro ocorreu tente novamente mais tarde ou reporte a administração.",
		});
	}
};

const deleteUsuario = async (req, res) => {
	cpf = req.params.cpf;

	try {
		const response = await pool.query("DELETE FROM USUARIO WHERE CPF = $1", [
			cpf,
		]);
		console.log('Delete usuario completed!');
		res.json(`Usuario de cpf ${cpf} deletado com sucesso.`);
	} catch (err) {
		res.json(err)
	}
	
};

const updateUsuario = async (req, res) => {
	const id = req.params.id;
	const request = req.body;

	try {
		const response = await pool.query(
			"UPDATE USUARIO SET NOME = $1, SENHA = $2, TELEFONE = $3, CPF = $4, CNPJ_LAVANDERIA = $5 WHERE CPF = $6",
			[request.nome, request.senha, request.telefone, request.cpf, request.cnpj_lavanderia, id]
		);
		console.log("update Usuario success!");
		res.json(req.body);
	} catch (err) {
		res.json(err)
	}
};

module.exports = {
	getAllUsuarios,
	getUsuarioByCPF,
	getAllUsuariosByCNPJ_LAVANDERIA,
	createUsuario,
	deleteUsuario,
	updateUsuario,
};

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
	const response = await pool.query("SELECT * FROM USUARIO");
	res.status(200).json(response.rows);
	console.log("All users sent concluded!");
};

const getUsuarioByCPF = async (req, res) => {
	const cpf = req.params.cpf;
	const response = await pool.query("SELECT * FROM USUARIO WHERE CPF = $1", [
		cpf,
	]);

	res.json(response.rows);
};

const getAllUsuariosByCNPJ_LAVANDERIA = async (req, res) => {
	const cnpj = req.params.cnpj;
	const response = await pool.query(
		"SELECT * FROM USUARIO WHERE CNPJ_LAVANDERIA = $1",
		[cnpj]
	);

	res.json(response.rows);
};

const createUsuario = async (req, res) => {
	const { nome, senha, telefone, cpf, cnpj_lavanderia } = req.body;

	try {
		await pool.query(
			"INSERT INTO USUARIO(NOME, SENHA, TELEFONE, CPF, CNPJ_LAVANDERIA) VALUES($1, $2, $3, $4, $5)",
			[nome, senha, telefone, cpf, cnpj_lavanderia]
		);
		console.log(response);
		res.json({
			message: "Usuario criado com sucesso",
			body: {
				usuario: {
					nome,
					senha,
					telefone,
					cpf,
					cnpj_lavanderia,
				},
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
	const response = await pool.query("DELETE FROM USUARIO WHERE CPF = $1", [
		cpf,
	]);
	res.json(`Usuario de cpf ${cpf} deletado com sucesso.`);
};

const updateUsuario = async (req, res) => {
	const id = req.params.cpf;
	const { nome, senha, telefone, cpf, cnpj_lavanderia } = req.body;

	const response = await pool.query(
		"UPDATE USUARIO U SET NOME = $1, SENHA = $2, TELEFONE = $3, CPF = $4, CNPJ_LAVANDERIA = $5 WHERE U.CPF = $6",
		[nome, senha, telefone, cpf, cnpj_lavanderia, id]
	);

	res.json('Usuario atualizado com sucesso!')
};

module.exports = {
	getAllUsuarios,
	getUsuarioByCPF,
	getAllUsuariosByCNPJ_LAVANDERIA,
	createUsuario,
	deleteUsuario,
	updateUsuario,
};

const { response } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	password: "12345",
	database: "la_vanderia",
	port: "5432",
});

const getAllClientesByLavanderia = async (req, res) => {
  const id = req.params.id;
  
  try {
    const response = await pool.query(
			"SELECT * FROM CLIENTE WHERE CNPJ_LAVANDERIA = $1",
			[id]
		);
		console.log("Get all clientes by lavanderia success!");
		res.json(response.rows);
  } catch (err) {
    res.json(err)
  }
	
};

const getClienteByCPF = async (req, res) => {
	const cpf = req.params.cpf;

	try {
		const response = await pool.query("SELECT * FROM CLIENTE WHERE CPF = $1", [
			cpf,
		]);
		console.log("Get Usuario success!");
		res.json(response.rows);
	} catch (err) {
		res.json(err);
	}
};

const updateCliente = async (req, res) => {
	const { nome, cpf, telefone, email, cnpj_lavanderia } = req.body;
	const id = req.params.id;

	try {
		const response = await pool.query(
			"UPDATE CLIENTE SET NOME=$1, TELEFONE=$2, EMAIL=$3, CNPJ_LAVANDERIA=$4 WHERE CPF = $5",
			[nome, telefone, email, cnpj_lavanderia, id]
		);
		console.log("Update cliente success!");
		res.json("Cliente atualizado com sucesso");
	} catch (err) {
		res.json(err);
	}
};

const insertCliente = async (req, res) => {
	const { nome, cpf, telefone, email, cnpj_lavanderia } = req.body;

	try {
		const response = await pool.query(
			"INSERT INTO CLIENTE(NOME, TELEFONE, EMAIL, CPF, CNPJ_LAVANDERIA) VALUES ($1, $2, $3, $4, $5)",
			[nome, telefone, email, cpf, cnpj_lavanderia]
		);
    console.log('Insert cliente success!')
		res.json("CLIENTE ADICIONADO!");
	} catch (err) {
		res.json(err);
	}
};

const deleteCliente = async (req, res) => {
  const cpf = req.params.cpf;
  
  try {
    const response = await pool.query("DELETE FROM CLIENTE WHERE CPF = $1", [
			cpf,
		]);
		console.log("Delete cliente success!");
		res.json(`CLIENTE DE CPF ${cpf} DELETADO!`);
  } catch(err) {
    res.json(err) 
  }
};

module.exports = {
	getAllClientesByLavanderia,
	getClienteByCPF,
	updateCliente,
	insertCliente,
	deleteCliente,
};

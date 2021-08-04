const { response, json } = require("express");
const { Pool } = require("pg");

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	password: "12345",
	database: "la_vanderia",
	port: "5432",
});

const getAllPedidosByLavanderia = async (req, res) => {
  const cnpj = req.params.cnpj

  try {
    const response = await pool.query(
			"SELECT P.* FROM CLIENTE C, PEDIDO P WHERE C.CNPJ_LAVANDERIA = $1 AND P.CPF_CLIENTE = C.CPF",
			[cnpj]
		);

    console.log("Get all pedidos success")
    res.json(response.rows)
  } catch (err) {
    res.json(err)
  }
}

const getAllPedidosByLavanderiaAndNotEntregue = async (req, res) => {
	const cnpj = req.params.cnpj;

	try {
		const response = await pool.query(
			"SELECT P.* FROM CLIENTE C, PEDIDO P WHERE C.CNPJ_LAVANDERIA = $1 AND P.CPF_CLIENTE = C.CPF AND P.STATUS != 'ENTREGUE'",
			[cnpj]
		);

		console.log("Get all pedidos by lavanderia not entregue success");
		res.json(response.rows);
	} catch (err) {
		res.json(err);
	}
};

const getAllPedidosByCliente = async (req, res) => {
  const cpf = req.params.cpf;

  try {
    const response = await pool.query(
      "SELECT * FROM PEDIDO WHERE CPF_CLIENTE = $1",
      [cpf]
    )

    console.log("Get pedidos by cliente success")
    res.json(response.rows)
  } catch (err) {
    res.json(err)
  }
}

const getPedido = async (req, res) => {
  const id = req.params.id

  try {
    const response = await pool.query(
      "SELECT * FROM PEDIDO WHERE ID_PEDIDO = $1",
      [id]
    );

    console.log("Get pedido success")
    res.json(response.rows)
  } catch (err) {
    res.json(err) 
  }

}

const updatePedido = async (req, res) => {
  const {peso, tipo, status, cpf_cliente} = req.body
  const id = req.params.id

  try {
    const response = await pool.query(
      "UPDATE PEDIDO SET PESO = $1, TIPO = $2, STATUS = $3, CPF_CLIENTE = $4 WHERE ID_PEDIDO = $5",
      [peso, tipo, status, cpf_cliente, id]
    )

    console.log('Update pedido success!')
    res.json('Pedido atualizado com sucesso!')
  } catch (err) {
    res.json(err)
  }
}

const deletePedido = async (req, res) => {
  const id = req.params.id

  try {
    const response = await pool.query(
      "DELETE FROM PEDIDO WHERE ID_PEDIDO = $1",
      [id]
    )

    console.log('Delete pedido success!')
    res.json('Pedido deletado com sucesso!')
  } catch (err) {
    res.json(err)
  }
}

const createPedido = async (req, res) => {
  const { peso, tipo, status, cpf_cliente } = req.body
  
  try {
    const response = await pool.query(
      "INSERT INTO PEDIDO (PESO, TIPO, STATUS, CPF_CLIENTE) VALUES ($1, $2, $3, $4)",
      [peso, tipo, status, cpf_cliente]
    )
    console.log('Insert pedido success!')
    res.json('Pedido adicionado!')
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  getAllPedidosByLavanderia,
  getAllPedidosByLavanderiaAndNotEntregue,
  getAllPedidosByCliente,
  getPedido,
  updatePedido,
  deletePedido,
  createPedido,
}
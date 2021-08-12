const { Router } = require("express");
const router = Router();

const {
	getAllUsuarios,
	createUsuario,
	getUsuarioByCPF,
	getAllUsuariosByCNPJ_LAVANDERIA,
	deleteUsuario,
	updateUsuario,
} = require("../controllers/usuarioController");

router.get("/usuario", getAllUsuarios);
router.get("/getusuario/:cpf", getUsuarioByCPF);
router.get("/:cnpj", getAllUsuariosByCNPJ_LAVANDERIA);
router.post("/usuario/create", createUsuario);
router.delete("/usuario/d=:cpf", deleteUsuario);
router.put("/usuario/up=:id", updateUsuario);

const {
	getAllClientesByLavanderia,
	getClienteByCPF,
	updateCliente,
	insertCliente,
	deleteCliente,
} = require("../controllers/clienteController");

router.get("/clientes/:id", getAllClientesByLavanderia);
router.get("/cliente/:cpf", getClienteByCPF);
router.put("/cliente/up=:id", updateCliente);
router.delete("/cliente/del=:cpf", deleteCliente);
router.post("/cliente", insertCliente);

const {
	getCustosByLavanderia,
	insertCustos,
	updateCustos,
	deleteCustos,
} = require("../controllers/custosController");

router.get("/getcustos/:cnpj", getCustosByLavanderia);
router.post("/custos", insertCustos);
router.put("/custos/update", updateCustos);
router.delete("/custos/del=:cnpj", deleteCustos);

const {
	getAllPedidosByLavanderia,
	getAllPedidosByCliente,
	getAllPedidosByLavanderiaAndNotEntregue,
	getPedido,
	updatePedido,
	deletePedido,
	createPedido,
} = require("../controllers/pedidoController");

router.get("/lavanderia/pedido/:cnpj", getAllPedidosByLavanderia);
router.get("/cliente/pedido/:cpf", getAllPedidosByCliente);
router.get(
	"/lavanderia/pedido/pendente/:cnpj",
	getAllPedidosByLavanderiaAndNotEntregue
);
router.get("/pedido/id=:id", getPedido);
router.put("/pedido/up=:id", updatePedido);
router.delete("/pedido/del=:id", deletePedido);
router.post("/pedido", createPedido);

module.exports = router;

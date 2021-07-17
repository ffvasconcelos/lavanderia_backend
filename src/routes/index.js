const { Router } = require('express');
const router = Router();

const { getAllUsuarios, createUsuario, getUsuarioByCPF, getAllUsuariosByCNPJ_LAVANDERIA, deleteUsuario, updateUsuario } = require('../controllers/usuarioController')

router.get('/usuario', getAllUsuarios)
router.get('/getusuario/:cpf', getUsuarioByCPF);
router.get('/:cnpj', getAllUsuariosByCNPJ_LAVANDERIA)
router.post('/usuario/create', createUsuario)
router.delete('/usuario/d=:cpf', deleteUsuario)
router.put('/usuario/up=:cpf', updateUsuario)

module.exports = router;
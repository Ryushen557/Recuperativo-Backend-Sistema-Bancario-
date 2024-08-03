const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios');

router.get('/', (req, res) => usuarioController.ObtenerTodosLosUsuarios(req, res));
router.get('/:id', (req, res) => usuarioController.ObtenerDetallesUsuario(req, res));
router.get('/:id/cuentas', (req, res) => usuarioController.ObtenerCuentasUsuario(req, res));

router.post('/', (req, res) => usuarioController.AñadirUsuario(req, res));

router.put('/:id', (req, res) => usuarioController.EditarUsuario(req, res));

router.delete('/:id', (req, res) => usuarioController.BorrarUsuario(req, res));

module.exports = router;
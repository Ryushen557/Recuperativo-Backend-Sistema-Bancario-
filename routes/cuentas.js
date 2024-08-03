const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentas');

router.post('/prestamos', (req, res) => cuentasController.AñadirCuentaPrestamo(req, res));
router.post('/ahorros', (req, res) => cuentasController.AñadirCuentaAhorro(req, res));

router.put('/prestamos/:id', (req, res) => cuentasController.EditarCuentaPrestamo(req, res));
router.put('/ahorros/:id', (req, res) => cuentasController.EditarCuentaAhorro(req, res));

router.delete('/prestamos/:id', (req, res) => cuentasController.EliminarCuentaPrestamo(req, res));
router.delete('/ahorros/:id', (req, res) => cuentasController.EliminarCuentaAhorro(req, res));

router.get('/prestamos/:cuentaId/proximafecha', cuentasController.MostrarProximaFechaPago);

router.get('/usuarios/:usuarioId/cuentas', cuentasController.MostrarCuentasUsuario);

router.get('/resumen/cuentas', cuentasController.MostrarResumenCuentas);

router.get('/:tipo/:cuentaId/movimientos', (req, res) => cuentasController.MostrarHistorialMovimientos(req, res));
module.exports = router;

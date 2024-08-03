const CuentasModel = require('../models/cuentas');

class CuentasController {
    AñadirCuentaPrestamo(req, res) {
        const { id, usuarioId, balance, tasaInteres, fechaProximoPago } = req.body;
        const nuevaCuenta = { id: parseInt(id), usuarioId, balance, tasaInteres, fechaProximoPago };
        CuentasModel.añadirCuentaPrestamo(nuevaCuenta)
            .then(results => res.status(201).json({ mensaje: 'Se ha añadido la cuenta de préstamo', cuenta: nuevaCuenta }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    AñadirCuentaAhorro(req, res) {
        const { id, usuarioId, balance, tasaInteres } = req.body;
        const nuevaCuenta = { id: parseInt(id), usuarioId, balance, tasaInteres };
        CuentasModel.añadirCuentaAhorro(nuevaCuenta)
            .then(results => res.status(201).json({ mensaje: 'Se ha añadido la cuenta de ahorro', cuenta: nuevaCuenta }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    EditarCuentaPrestamo(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres, fechaProximoPago } = req.body;
        CuentasModel.editarCuentaPrestamo(id, { balance, tasaInteres, fechaProximoPago })
            .then(results => res.json({ mensaje: 'Cuenta de préstamo actualizada', cuenta: { id, balance, tasaInteres, fechaProximoPago } }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    EditarCuentaAhorro(req, res) {
        const { id } = req.params;
        const { balance, tasaInteres } = req.body;
        CuentasModel.editarCuentaAhorro(id, { balance, tasaInteres })
            .then(results => res.json({ mensaje: 'Cuenta de ahorro actualizada', cuenta: { id, balance, tasaInteres } }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    EliminarCuentaPrestamo(req, res) {
        const { id } = req.params;
        CuentasModel.eliminarCuentaPrestamo(id)
            .then(results => res.json({ mensaje: 'Cuenta eliminada' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    EliminarCuentaAhorro(req, res) {
        const { id } = req.params;
        CuentasModel.eliminarCuentaAhorro(id)
            .then(results => res.json({ mensaje: 'Cuenta eliminada' }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    MostrarProximaFechaPago(req, res) {
        const { cuentaId } = req.params;
        CuentasModel.mostrarProximaFechaPago(cuentaId)
            .then(fechaProximoPago => res.json({ fechaProximoPago }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    MostrarResumenCuentas(req, res) {
        CuentasModel.mostrarResumenCuentas()
            .then(resumen => res.json(resumen))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    MostrarCuentasUsuario(req, res) {
        const { usuarioId } = req.params;
        CuentasModel.mostrarCuentasUsuario(usuarioId)
            .then(cuentas => res.json(cuentas))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    MostrarHistorialMovimientos(req, res) {
        const { tipo, cuentaId } = req.params;
        CuentasModel.obtenerHistorialMovimientos(tipo, cuentaId)
            .then(movimientos => res.json(movimientos))
            .catch(error => res.status(500).json({ error: error.message }));
    }
}

module.exports = new CuentasController();

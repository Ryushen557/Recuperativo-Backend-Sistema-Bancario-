const CuentasModel = require('../models/cuentas');

class CuentasController {
    CrearCuenta(id,tipo,interes){
        return new Promise((resolve, reject) => {
            CuentasModel.CrearCuenta(id,tipo,interes)
            .then((result) => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    ObtenerCuenta(cookie,tipo){
        return new Promise((resolve, reject) => {
            CuentasModel.ObtenerCuenta(cookie,tipo)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    ModificarSaldo(cookie,cantidad){
        return new Promise((resolve, reject) => {
            CuentasModel.ModificarSaldo(cookie,cantidad)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Transferencia(id,datos){
        return new Promise((resolve, reject) => {
            CuentasModel.Transferencia(id,datos)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    ObtenerHistorial(token){
        return new Promise((resolve, reject) => {
            CuentasModel.ObtenerHistorial(token)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    ObtenerCuentas(){
        return new Promise((resolve, reject) => {
            CuentasModel.ObtenerCuentas()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}
   

module.exports = new CuentasController();

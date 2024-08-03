const CooperativaModel = require('../models/cooperativas');

class CooperativaController {
    ObtenerCooperativas(){
        return new Promise((resolve, reject) => {
             CooperativaModel.ObtenerCooperativas()
             .then((result) => {
                resolve(result)
             }).catch((err) => {
                reject(err)
             });
        })
    }
    Agregar(datos){
        return new Promise((resolve, reject) => {
            CooperativaModel.Agregar(datos)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Editar(id,datos){
        return new Promise((resolve, reject) => {
            CooperativaModel.Editar(id,datos)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Eliminar(id){
        return new Promise((resolve, reject) => {
            CooperativaModel.Eliminar(id)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Unirse(id,datos){
        return new Promise((resolve, reject) => {
            CooperativaModel.Unirse(id,datos)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    CoopUsuario(id){
        return new Promise((resolve, reject) => {
            CooperativaModel.CoopUsuario(id)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Pagar(id){
        return new Promise((resolve, reject) => {
            CooperativaModel.Pagar(id)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}
module.exports = new CooperativaController();
const prestamoModels = require('../models/prestamos')

class prestamoController{
    Obtener(){
        return new Promise((resolve, reject) => {
            prestamoModels.Obtener()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Agregar(datos){
        return new Promise((resolve, reject) => {
            prestamoModels.Agregar(datos)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Editar(id,datos){
        return new Promise((resolve, reject) => {
            prestamoModels.Editar(id,datos)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Eliminar(id){
        return new Promise((resolve, reject) => {
            prestamoModels.Eliminar(id)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Unirse(id,datos){
        return new Promise((resolve, reject) => {
            prestamoModels.Unirse(id,datos)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    prestamoUsuario(id){
        return new Promise((resolve, reject) => {
            prestamoModels.prestamoUsuario(id)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Pagar(id){
        return new Promise((resolve, reject) => {
            prestamoModels.Pagar(id)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
}
module.exports = new prestamoController()
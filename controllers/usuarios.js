const UsuarioModel = require('../models/usuarios');

class UsuarioController {
  
    
    IniciarSesion(usuario) {
       return new Promise((resolve, reject) => {
        UsuarioModel.IniciarSesion(usuario)
        .then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        });
       })
    }

   
   
    Registrarse(usuario){
        return new Promise((resolve, reject) => {
            UsuarioModel.Registrarse(usuario)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Decodificar(token){
        return new Promise((resolve, reject) => {
            UsuarioModel.Decodificar(token)
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });

        })
    }
    CerrarSesion(cookie){
        return new Promise((resolve, reject) => {
            UsuarioModel.CerrarSesion(cookie)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Editar(id,datos){
        return new Promise((resolve, reject) => {
            UsuarioModel.Editar(id,datos)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
    Obtener(){
        return new Promise((resolve, reject) => {
            UsuarioModel.Obtener()
            .then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err)
            });
        })
    }
    BorrarUsuario(id){
        return new Promise((resolve, reject) => {
            UsuarioModel.BorrarUsuario(id)
            .then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        })
    }
   
}

module.exports = new UsuarioController();

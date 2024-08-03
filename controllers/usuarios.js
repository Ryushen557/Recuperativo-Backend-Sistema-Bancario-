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

    EditarUsuario(req, res) {
        const { id } = req.params;
        const { nombre, email } = req.body;
        UsuarioModel.editarUsuario(id, { nombre, email })
            .then(results => res.json({ mensaje: 'Usuario actualizado', usuario: { id, nombre, email } }))
            .catch(error => res.status(500).json({ error: error.message }));
    }

    BorrarUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.borrarUsuario(id)
            .then(results => res.json({ mensaje: 'Usuario eliminado' }))
            .catch(error => res.status(500).json({ error: error.message }));
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
}

module.exports = new UsuarioController();

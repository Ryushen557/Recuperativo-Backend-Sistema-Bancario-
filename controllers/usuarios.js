const UsuarioModel = require('../models/usuarios');

class UsuarioController {
    ObtenerTodosLosUsuarios(req, res) {
        UsuarioModel.obtenerTodosLosUsuarios()
            .then(usuarios => res.render('usuarios', { usuarios }))
            .catch(error => res.status(500).json({ error: error.message }));
    }
    
    AñadirUsuario(req, res) {
        const { id, nombre, email } = req.body;
        const nuevoUsuario = { id: parseInt(id), nombre, email };
        UsuarioModel.añadirUsuario(nuevoUsuario)
            .then(results => res.status(201).json({ mensaje: 'Se ha añadido el usuario', usuario: nuevoUsuario }))
            .catch(error => res.status(500).json({ error: error.message }));
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

    ObtenerDetallesUsuario(req, res) {
        const { id } = req.params;
        UsuarioModel.obtenerDetallesUsuario(id)
            .then(usuario => {
                if (usuario) {
                    res.render('detalleUsuario', { usuario });
                } else {
                    res.status(404).json({ mensaje: 'No se encontró el usuario en la base de datos' });
                }
            })
            .catch(error => res.status(500).json({ error: error.message }));
    }

}

module.exports = new UsuarioController();

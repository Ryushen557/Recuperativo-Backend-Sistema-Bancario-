const pool = require('../conexion');

class UsuariosModel {
    static obtenerTodosLosUsuarios() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM usuarios', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static añadirUsuario(usuario) {
        return new Promise((resolve, reject) => {
            const { id, nombre, email } = usuario;
            pool.query('INSERT INTO usuarios (id, nombre, email) VALUES (?, ?, ?)', [id, nombre, email], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static editarUsuario(id, usuario) {
        return new Promise((resolve, reject) => {
            const { nombre, email } = usuario;
            pool.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static borrarUsuario(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerDetallesUsuario(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }
}

module.exports = UsuariosModel;

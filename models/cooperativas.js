const pool = require('../conexion');

class CooperativaModel {
    static añadirCooperativa(cooperativa) {
        return new Promise((resolve, reject) => {
            const { id, nombre, usuariosDeCooperativa } = cooperativa;
            pool.query('INSERT INTO cooperativas (id, nombre) VALUES (?, ?)', [id, nombre], (error, results) => {
                if (error) {
                    return reject(error);
                }
                const cooperativaId = results.insertId;
                if (usuariosDeCooperativa && usuariosDeCooperativa.length > 0) {
                    const usuarioPromises = usuariosDeCooperativa.map(usuarioId => 
                        new Promise((resolve, reject) => {
                            pool.query('UPDATE usuarios SET cooperativaId = ? WHERE id = ?', [cooperativaId, usuarioId], (error, results) => {
                                if (error) {
                                    return reject(error);
                                }
                                resolve(results);
                            });
                        })
                    );
                    Promise.all(usuarioPromises)
                        .then(() => resolve(results))
                        .catch(reject);
                } else {
                    resolve(results);
                }
            });
        });
    }
    
    static editarCooperativa(id, cooperativa) {
        return new Promise((resolve, reject) => {
            const { nombre } = cooperativa;
            pool.query('UPDATE cooperativas SET nombre = ? WHERE id = ?', [nombre, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static borrarCooperativa(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM cooperativas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static eliminarUsuarioDeCooperativa(cooperativaId, usuarioId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE usuarios SET cooperativaId = NULL WHERE id = ? AND cooperativaId = ?', [usuarioId, cooperativaId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static relacionarUsuarioConCooperativa(cooperativaId, usuarioId) {
        return new Promise((resolve, reject) => {
            pool.query('UPDATE usuarios SET cooperativaId = ? WHERE id = ?', [cooperativaId, usuarioId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerTodasCooperativas() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cooperativas', (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerDetallesCooperativa(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cooperativas WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    static obtenerResumen() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT 
                    (SELECT COUNT(*) FROM ahorros) AS totalAhorros, 
                    (SELECT COUNT(*) FROM prestamos) AS totalPrestamos, 
                    (SELECT COUNT(*) FROM usuarios) AS totalUsuarios 
                FROM DUAL`, (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            });
        });
    }

    static obtenerMovimientos(cooperativaId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.nombre, c.monto, c.fechaPago, 
                       CASE WHEN c.fechaPago <= c.fechaLimite THEN 'Pagado a tiempo' ELSE 'Moroso' END AS estado
                FROM cuotas c
                JOIN usuarios u ON c.usuarioId = u.id
                WHERE c.cooperativaId = ?
                ORDER BY c.fechaPago DESC`;
            pool.query(query, [cooperativaId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static obtenerTurnosCobro(cooperativaId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT u.nombre, c.monto, c.turnoCobro, c.estado
                FROM turnos c
                JOIN usuarios u ON c.usuarioId = u.id
                WHERE c.cooperativaId = ?
                ORDER BY c.turnoCobro ASC`;
            pool.query(query, [cooperativaId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}
module.exports = CooperativaModel;
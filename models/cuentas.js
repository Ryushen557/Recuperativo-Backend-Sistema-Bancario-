const pool = require('../conexion');

class CuentasModel {
    static añadirCuentaPrestamo(cuenta) {
        return new Promise((resolve, reject) => {
            const { id, usuarioId, balance, tasaInteres, fechaProximoPago } = cuenta;
            pool.query('INSERT INTO prestamos (id, usuarioId, balance, tasaInteres, fechaProximoPago, tipo) VALUES (?, ?, ?, ?, ?, ?)', [id, usuarioId, balance, tasaInteres, fechaProximoPago, 'prestamo'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static añadirCuentaAhorro(cuenta) {
        return new Promise((resolve, reject) => {
            const { id, usuarioId, balance, tasaInteres } = cuenta;
            pool.query('INSERT INTO ahorros (id, usuarioId, balance, tasaInteres, tipo) VALUES (?, ?, ?, ?, ?)', [id, usuarioId, balance, tasaInteres, 'ahorro'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static editarCuentaPrestamo(id, cuenta) {
        return new Promise((resolve, reject) => {
            const { balance, tasaInteres, fechaProximoPago } = cuenta;
            pool.query('UPDATE prestamos SET balance = ?, tasaInteres = ?, fechaProximoPago = ? WHERE id = ? AND tipo = ?', [balance, tasaInteres, fechaProximoPago, id, 'prestamo'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static editarCuentaAhorro(id, cuenta) {
        return new Promise((resolve, reject) => {
            const { balance, tasaInteres } = cuenta;
            pool.query('UPDATE ahorros SET balance = ?, tasaInteres = ? WHERE id = ? AND tipo = ?', [balance, tasaInteres, id, 'ahorro'], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static eliminarCuentaPrestamo(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM prestamos WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static eliminarCuentaAhorro(id) {
        return new Promise((resolve, reject) => {
            pool.query('DELETE FROM ahorros WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }

    static mostrarProximaFechaPago(id) {
        return new Promise((resolve, reject) => {
            pool.query('SELECT fechaProximoPago FROM prestamos WHERE id = ?', [id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                if (results.length === 0) {
                    return reject(new Error('No se encontró la cuenta de préstamo'));
                }
                resolve(results[0].fechaProximoPago);
            });
        });
    }

    static mostrarResumenCuentas() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 'prestamo' AS tipo, SUM(balance) AS totalBalance, AVG(tasaInteres) AS promedioTasaInteres FROM prestamos
                UNION ALL
                SELECT 'ahorro' AS tipo, SUM(balance) AS totalBalance, AVG(tasaInteres) AS promedioTasaInteres FROM ahorros`;
            pool.promise().query(query)
                .then(([results]) => {
                    const resumen = results.reduce((acc, row) => {
                        acc[`total${row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}`] = row.totalBalance;
                        acc[`promedioTasaInteres${row.tipo.charAt(0).toUpperCase() + row.tipo.slice(1)}`] = row.promedioTasaInteres;
                        return acc;
                    }, {});
                    resolve(resumen);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    static mostrarCuentasUsuario(usuarioId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT 'prestamo' AS tipo, id, balance, tasaInteres FROM prestamos WHERE usuarioId = ?
                UNION ALL
                SELECT 'ahorro' AS tipo, id, balance, tasaInteres FROM ahorros WHERE usuarioId = ?`;
            pool.query(query, [usuarioId, usuarioId], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
    
    static obtenerHistorialMovimientos(tipo, id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT fecha, monto, balance AS nuevoCapital, 
                       CASE WHEN tipo = 'prestamo' THEN (monto * tasaInteres / 100) ELSE 0 END AS interesPagado,
                       CASE WHEN tipo = 'ahorro' THEN monto ELSE 0 END AS capitalAbonado
                FROM movimientos
                WHERE tipo = ? AND cuentaId = ?
                ORDER BY fecha DESC`;
            pool.query(query, [tipo, id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    }
}

module.exports = CuentasModel;

const pool = require('../conexion')
const jwt = require("jsonwebtoken");


class prestamoModels{
 Obtener(){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM prestamos`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
            
        })
    })
 }
 Agregar(datos) {
    return new Promise((resolve, reject) => {
      let monto = datos.pagoTotal;
      let fecha = datos.fechaPago;
      let interes = datos.interes;
              pool.query(`INSERT INTO prestamos (monto, fechaPago,interes) VALUES ('${monto}','${fecha}','${interes}')`, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
        })
      }
      Editar(id, datos) {
        return new Promise((resolve, reject) => {
          let monto = datos.pago;
          let fecha = datos.fecha;
          let interes = datos.interes;
            pool.query(`UPDATE prestamos SET monto ='${monto}', fechaPago = '${fecha}', interes = '${interes}'  WHERE id = ${id} `, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                    console.log(result)
                  resolve(result);
                }
              });
        });
      }
      Eliminar(id) {
        return new Promise((resolve, reject) => {
          pool.query(`DELETE FROM prestamos WHERE id = ${id} `, function (err, result) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      }
      Unirse(ID, datos) {
        return new Promise((resolve, reject) => {
          let usuario = jwt.decode(ID, process.env.AUTENTICADOR);
          let idprestamo = datos.id;
          pool.query(`SELECT * FROM cuenta WHERE idUsuario = ${usuario.id}`, function (err, result) {
            if (err) {
              reject(err);
            } else {
              let resultUser = result;
              pool.query(`SELECT * FROM prestamos WHERE id = '${idprestamo}'`, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  let resultprestamo = result;
                  pool.query(`SELECT * FROM prestamoUsuario WHERE idPrestamo = ${idprestamo} AND idUsuario = ${usuario.id} `, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      if (result.length > 0) {
                        reject(new Error("Ya eres parte de esta prestamos"));
                      } else {
                        pool.query(`INSERT INTO prestamoUsuario (idCuenta, idPrestamo, idUsuario) VALUES (${resultUser[0].id},${resultprestamo[0].id},${resultUser[0].idUsuario})`, function (err, result) {
                          if (err) {
                            reject(err);
                          } else {
                            pool.query(`UPDATE cuenta SET cantidad = cantidad + ${resultprestamo[0].monto} WHERE idUsuario = ${usuario.id} AND tipoCuenta = 'corriente'`, function (err, result) {
                              if (err) {
                                reject(err);
                              } else {
                                resolve();
                              }
                            });
                          }
                        });
                      }
                    }
                  });
                }
              });
            }
          });
        });
      }
      prestamoUsuario(idUsuario) {
        return new Promise((resolve, reject) => {
          let id = jwt.decode(idUsuario, process.env.AUTENTICADOR);
          let query = `SELECT prestamos.id AS id, prestamos.fechaPago AS fecha, prestamos.monto AS monto FROM prestamos JOIN prestamoUsuario ON prestamoUsuario.idPrestamo = prestamos.id  WHERE idUsuario = ${id.id} `;
          pool.query(query, function (err, result) {
            if (err) {
              reject(err);
            } else {
              if (result.length > 0) {
                resolve(result);
              } else {
                reject();
              }
            }
          });
        });
      }
}

module.exports = new prestamoModels()
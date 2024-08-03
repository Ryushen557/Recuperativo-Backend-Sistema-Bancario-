const pool = require('../conexion');
const jwt = require("jsonwebtoken");

class CooperativaModel {
    ObtenerCooperativas(){
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM cooperativa',function(err,result){
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
          let nombre = datos.nombre
          let pago = datos.pagoTotal;
          let fecha = datos.fechaPago;
          let pagoMensual = datos.pagoMensual;
          let duracion = datos.duracion;
          if (pagoMensual * duracion != pago) {
            reject(new Error("El pago total debecoincidir con la suma de los pagos mensuales"));
          } else {
                  pool.query(`INSERT INTO cooperativa (nombre,pago, fechaPago, pagoMensual,duracion) VALUES ('${nombre}','${pago}','${fecha}','${pagoMensual}', '${duracion}')`, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  });
                 }
            });
          }
          Editar(id, datos) {
            return new Promise((resolve, reject) => {
                console.log(id,datos)
              let nombre = datos.nombre
              let pago = datos.pago;
              let fecha = datos.fecha;
              let pagoMensual = datos.pagoMensual;
              let duracion = datos.duracion;
              if (pagoMensual * duracion != pago) {
                reject(new Error("El pago total debecoincidir con la suma de los pagos"))
              }else{
                pool.query(`UPDATE cooperativa SET nombre = '${nombre}',pago ='${pago}', fechaPago = '${fecha}', pagoMensual = '${pagoMensual}', duracion = '${duracion}'  WHERE id = ${id} `, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(result);
                    }
                  });
              }
            });
          }
          Eliminar(id) {
            return new Promise((resolve, reject) => {
              pool.query(`DELETE FROM cooperativa WHERE id = ${id} `, function (err, result) {
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
              let idcoop = datos.id;
              pool.query(`SELECT * FROM cuenta WHERE idUsuario = ${usuario.id}`, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  let resultUser = result;
                  pool.query(`SELECT * FROM cooperativa WHERE id = '${idcoop}'`, function (err, result) {
                    if (err) {
                      reject(err);
                    } else {
                      let resultCoop = result;
                      pool.query(`SELECT * FROM coopCuenta WHERE idCooperativa = ${idcoop} AND idUsuario = ${usuario.id} `, function (err, result) {
                        if (err) {
                          reject(err);
                        } else {
                          if (result.length > 0) {
                            reject(new Error("Ya eres parte de esta cooperativa"));
                          } else {
                            pool.query(`INSERT INTO coopCuenta (idCuenta, idCooperativa, idUsuario) VALUES (${resultUser[0].id},${resultCoop[0].id},${resultUser[0].idUsuario})`, function (err, result) {
                              if (err) {
                                reject(err);
                              } else {
                                pool.query(`UPDATE cuenta SET cantidad = cantidad + ${resultCoop[0].pago} WHERE idUsuario = ${usuario.id} AND tipoCuenta = 'corriente'`, function (err, result) {
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
          CoopUsuario(idUsuario) {
            return new Promise((resolve, reject) => {
              let id = jwt.decode(idUsuario, process.env.AUTENTICADOR);
              let query = `SELECT cooperativa.id AS id, cooperativa.fechaPago AS fecha, cooperativa.pagoMensual AS pago,cooperativa.nombre AS nombre FROM cooperativa JOIN coopCuenta ON coopCuenta.idCooperativa = cooperativa.id  WHERE idUsuario = ${id.id} `;
              pool.query(query, function (err, result) {
                if (err) {
                  reject(err);
                } else {
                  if (result.length > 0) {
                    resolve(result);
                  } else {
                    reject(new Error("No perteneces a ninguna cooperativa"));
                  }
                }
              });
            });
          }
}
module.exports = new CooperativaModel();
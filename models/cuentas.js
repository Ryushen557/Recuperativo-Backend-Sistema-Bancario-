const pool = require('../conexion');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

class CuentasModel {
    CrearCuenta(id,tipo,interes){
        return new Promise(async(resolve,reject)=>{
            let numeroCuenta = ""
            let query = ""
                 for(let i = 0;i<10;i++){
                    numeroCuenta +=Math.floor(Math.random() * 10)
                }
                if(tipo==="Corriente"){
                    query = `INSERT INTO cuenta (cantidad,idUsuario,tipoCuenta,numeroCuenta) VALUES (0, ${id},'Corriente',${Number(numeroCuenta)})`
                }else{
                    query = `INSERT INTO cuenta (cantidad,idUsuario,tipoCuenta,numeroCuenta,interes) VALUES (0,${id},'Ahorro',${Number(numeroCuenta)},${interes})`
                }
                pool.query(query,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                })
            
           
           
        })
    }
    ObtenerCuenta(cookie,tipo){
        return new Promise((resolve,reject)=>{
            let usuario = jwt.decode(cookie,process.env.AUTENTICADOR)
            pool.query(`SELECT * FROM cuenta WHERE idUsuario = ${usuario.id} AND tipoCuenta = '${tipo}'`,function(err,result){
                if(err){
                    reject(err)
                }else{
                    if(result.length===0){
                        reject(new Error(`No tienes una cuenta del tipo ${tipo}`))
                    }else{
                        resolve(result[0])
                    }
                }
                
            })
        })
    }
    ModificarSaldo(cookie,cantidad){
        return new Promise((resolve,reject)=>{
            let usuario = jwt.decode(cookie,process.env.AUTENTICADOR)
            if(cantidad.cantidadCorriente){
                pool.query(`UPDATE cuenta SET cantidad = cantidad + ${cantidad.cantidadCorriente} WHERE idUsuario = ${usuario.id} AND tipoCuenta = 'Corriente'`,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }) 
            }else{
                pool.query(`UPDATE cuenta SET cantidad = cantidad + ${cantidad.cantidadAhorro} WHERE idUsuario = ${usuario.id} AND tipoCuenta = 'Ahorro'`,function(err,result){
                    if(err){
                        reject(err)
                    }else{
                        resolve()
                    }
                }) 
            }
        })
    }
    Transferencia(user,datos){
        return new Promise((resolve, reject) => {
          let monto = datos.monto
            let concepto = datos.concepto
            let usuario = datos.usuario
            let cuentaDestino = datos.destino
            let cuentaUsuario = datos.cuenta
            let clave = datos.clave
            let usuarioDestinoID = null
            let usuarioDeco = jwt.decode(user,process.env.AUTENTICADOR)
            pool.query(`SELECT * FROM usuarios WHERE id = ${usuarioDeco.id}`,async function(err,result){
                if(err){
                    reject(err)
                }else{
                    let claveBD=result[0].clave
                    let usuarioOrigen=result[0].usuario
                    let claveDesencriptada = await bcryptjs.compare(clave,claveBD)
                    if(claveDesencriptada){
                        pool.query(`SELECT * FROM usuarios WHERE usuario = '${usuario}'`,function(err,result){
                            if(err){
                                reject(err)
                            }else{
                                usuarioDestinoID = result[0].id
                                console.log(usuarioDestinoID)
                            }
                        })
                        pool.query(`SELECT * FROM cuenta WHERE idUsuario = ${usuarioDeco.id} AND tipoCuenta = '${cuentaUsuario}'`,function(err,result){
                            if(err){
                                reject(err)
                            }else{
                                if(result.length === 0){
                                    reject(new Error('No se encontro la cuenta'))
                                }else{
                                    let cuenta = result[0]
                                    if(cuenta.cantidad>=monto){
                                        pool.query(`SELECT cantidad AS cantidadDestino FROM cuenta WHERE numeroCuenta = '${cuentaDestino}' AND idUsuario = ${usuarioDestinoID} `,function(err,result){
                                            if(err){
                                                reject(err)
                                            }else{
                                                if(result.length>0){
                                                    let cantidadDestino = Math.floor(result[0].cantidadDestino) +Number(monto)
                                                    console.log(cantidadDestino)
                                                    let cantidadOrigen = cuenta.cantidad - monto
                                                    pool.query(`UPDATE cuenta SET cantidad = ${cantidadDestino} WHERE numeroCuenta = ${cuentaDestino}`,function(err,result){
                                                        if(err){
                                                            reject(err)
                                                        }else{
                                                            pool.query(`UPDATE cuenta SET cantidad = ${cantidadOrigen} WHERE idUsuario = ${usuarioDeco.id} AND tipoCuenta = '${cuentaUsuario}'`,async function(err,result){
                                                                if(err){
                                                                    reject(err)
                                                                }else{
                                                                        let fecha = new Date()
                                                                        let fechaHora = fecha.toLocaleDateString()
                                                                        let operacion = ""
                                                                        console.log(fechaHora)
                                                                        for(let i = 0;i<5;i++){
                                                                            operacion += await new Promise((resolve,reject)=>{
                                                                                resolve(Math.floor(Math.random() * 10));
                                                                            })
                                                                        }
                                                                        let queryRegistro = `INSERT INTO transferencias (usuarioOrigen,usuarioDestino,monto,concepto,cuentaOrigen,cuentaDestino,fecha,operacion) VALUES ('${usuarioOrigen}','${usuario}',${monto},'${concepto}',${cuenta.numeroCuenta},${cuentaDestino},'${fechaHora}','${operacion}')`
                                                                        pool.query(queryRegistro,function(err,result){
                                                                            if(err){
                                                                                reject(err)
                                                                            }else{
                                                                                resolve("Transferencia Realizada con exito")
                                                                            }
                                                                        })
                                                                    }
                                                            })
                                                        }
                                                    })
    
                                                }else{
                                                    reject(new Error("El Usuario y el numero de cuenta no coinciden"))
                                                }
                                            }
                                        })
                                    }else{
                                        reject(new Error("El cantidad no es suficiente"))
                                    }
                                }
                            }
                        })
                    }else{
                        reject(new Error("Clave Incorrecta"))
                    }
                }
            })
           
        })
    }
    ObtenerHistorial(token){
        return new Promise((resolve, reject) => {
            let usuario = jwt.decode(token,process.env.AUTENTICADOR)
            pool.query(`SELECT * FROM transferencias WHERE usuarioDestino = '${usuario.usuario}' OR usuarioOrigen = '${usuario.usuario}'`,function(err,result){
                if(err){
                reject(err)
                }else{
                    resolve(result)
                }
            })
        })
     }   
     ObtenerCuentas(){
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM cuenta",(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
     }
}

module.exports = new CuentasModel();

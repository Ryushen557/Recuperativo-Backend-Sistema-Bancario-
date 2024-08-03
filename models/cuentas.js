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
}

module.exports = new CuentasModel();

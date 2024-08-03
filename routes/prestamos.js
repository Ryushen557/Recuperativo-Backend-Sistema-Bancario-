const express = require("express");
const router = express.Router();
const prestamoController = require('../controllers/prestamos')
const usuarioController = require("../controllers/usuarios");


 router.get("/",(req,res)=>{
     let user = null
     let prestamoUser = []
     usuarioController.Decodificar(req.cookies.token)
    .then((result) => {
         user = result
        prestamoController.Obtener()
         .then((prestamo) => {
             prestamoController.prestamoUsuario(req.cookies.token)
             .then((prestamosUser) => {
                 prestamoUser = prestamosUser
             }).catch((err) => {
                 console.error(err)
             })
             .finally(()=>{
                 res.render("cuentasPrestamos",{prestamos:prestamo,Usuario:user,prestamoUser:prestamoUser})

             })
         }).catch((err) => {
             res.render("error", { message: err.message, error: err });
         });
     }).catch((err) => {
         res.render("error", { message: err.message, error: err });
     });
 })
router.post("/",(req,res)=>{
    if(req.body.interes){
        prestamoController.Agregar(req.body)
        .then(() => {
            res.redirect("/prestamos")
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });
    
        });
    }else{
        prestamoController.Unirse(req.cookies.token,req.body)
        .then(() => {
            res.redirect("/prestamos")
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });

        });
    }
    
})
router.put("/editar/:id",(req,res)=>{
    prestamoController.Editar(req.params.id,req.body)
    .then((result) => {
        console.log(result)
        res.redirect("/prestamos")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.delete("/borrar/:id",(req,res)=>{
    prestamoController.Eliminar(req.params.id)
    .then(() => {
        res.redirect("/prestamos")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})




module.exports = router;

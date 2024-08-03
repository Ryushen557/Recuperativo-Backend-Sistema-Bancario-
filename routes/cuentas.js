const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentas');
const usuarioController = require("../controllers/usuarios");

router.get("/Ahorro",(req,res)=>{
    usuarioController.Decodificar(req.cookies.token)
    .then((result) => {
        cuentasController.CrearCuenta(result.id,"Ahorro",0.6)
        .then(() => {
            res.redirect("/cuentas")
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });
        });
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });

})
router.get("/",(req,res)=>{
    let corriente = null
    let ahorro = null
    cuentasController.ObtenerCuenta(req.cookies.token,"Corriente")
    .then((result) => {
        corriente = result
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    })
    .finally(()=>{
        cuentasController.ObtenerCuenta(req.cookies.token,"Ahorro")
    .then((result2) => {
        ahorro = result2
    }).catch((err) => {
        console.error(err)
    })
    .finally(()=>{
        res.render("cuentas",{corriente,ahorro})
    })
    })
})
router.post("/",(req,res)=>{
    cuentasController.ModificarSaldo(req.cookies.token,req.body)
    .then(() => {
        res.redirect("/cuentas")
    }).catch((err) => {
        console.error(err)
        res.render("error", { message: err.message, error: err });
    });
})
module.exports = router;

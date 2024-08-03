const express = require('express');
const router = express.Router();
const cooperativaController = require('../controllers/cooperativas');
const usuarioController = require("../controllers/usuarios");
const usuarios = require('../models/usuarios');


router.get("/",(req,res)=>{
    let user = null
    let coopUsers = []
    usuarioController.Decodificar(req.cookies.token)
    .then((result) => {
        user = result
        cooperativaController.ObtenerCooperativas()
        .then((coop) => {
            cooperativaController.CoopUsuario(req.cookies.token)
            .then((coopUser) => {
                coopUsers = coopUser
            }).catch((err) => {
                console.error(err)
            })
            .finally(()=>{
                res.render("cooperativas",{cooperativas:coop,Usuario:user,coopUser:coopUsers})

            })
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });
        });
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.post("/",(req,res)=>{
    if(req.body.nombre){
        cooperativaController.Agregar(req.body)
        .then(() => {
            res.redirect("/cooperativas")
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });
    
        });
    }else{
        cooperativaController.Unirse(req.cookies.token,req.body)
        .then(() => {
            res.redirect("/cooperativas")
        }).catch((err) => {
            res.render("error", { message: err.message, error: err });

        });
    }
    
})
router.put("/editar/:id",(req,res)=>{
    console.log("LLegue")
    cooperativaController.Editar(req.params.id,req.body)
    .then((result) => {
        console.log(result)
        res.redirect("/cooperativas")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.delete("/borrar/:id",(req,res)=>{
    cooperativaController.Eliminar(req.params.id)
    .then(() => {
        res.redirect("/cooperativas")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.get("/pagar",(req,res)=>{
    cooperativaController.Pagar(req.cookies.token)
    .then(() => {
        res.redirect("/cooperativas")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });

    });
})
module.exports = router;
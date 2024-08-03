const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios");
const usuarios = require("../models/usuarios");

router.get("/", (req, res) =>
    res.render("index")
)
router.post("/",(req,res)=>{
    console.log(req.body)
    usuarioController.IniciarSesion(req.body)
    .then((usuario) => {
        res.cookie("token",usuario)
        res.redirect("/usuarios/Inicio")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.get("/Inicio",(req,res)=>{
    usuarioController.Decodificar(req.cookies.token)
    .then((result) => {
        res.render("Inicio",{token:result})
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.get("/Registro",(req,res)=>{
    res.render("Registro")
})
router.post("/Registro",(req,res)=>{
    usuarioController.Registrarse(req.body)
    .then(() => {
            res.redirect("/usuarios")
    }).catch((err) => {
        console.error(err)
        res.render("error", { message: err.message, error: err });
    })
    })
router.get("/cerrar",(req,res)=>{
    usuarioController.CerrarSesion(req.cookies.token)
    .then(() => {
        res.clearCookie("token")
        res.redirect("/usuarios")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.get("/editar",(req,res)=>{
    usuarioController.Decodificar(req.cookies.token)
    .then((result) => {
        res.render("editarUsuario",{usuario:result})

    }).catch((err) => {
        res.render("error", { message: err.message, error: err });

    });
})
router.put("/editar/:id",(req,res)=>{
    usuarioController.Editar(req.params.id,req.body)
    .then((result) => {
        res.redirect("/usuarios")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})

module.exports = router;

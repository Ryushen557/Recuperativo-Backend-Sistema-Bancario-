const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarios");

router.get("/", (req, res) =>
    res.render("index")
)
router.post("/",(req,res)=>{
    console.log(req.body)
    usuarioController.IniciarSesion(req.body)
    .then((usuario) => {
        res.cookie(usuario,"token")
        res.redirect("/usuarios/Inicio")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})
router.get("/Inicio",(req,res)=>{
    res.render("Inicio")
})
router.get("/Registro",(req,res)=>{
    res.render("Registro")
})
router.post("/Registro",(req,res)=>{
    usuarioController.Registrarse(req.body)
    .then((result) => {
        res.redirect("/usuarios/Inicio")
    }).catch((err) => {
        res.render("error", { message: err.message, error: err });
    });
})

module.exports = router;

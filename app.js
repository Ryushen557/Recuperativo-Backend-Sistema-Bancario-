const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/');
const usuarioRouter = require('./routes/usuarios');
const cuentaRouter = require('./routes/cuentas');
const cooperativaRouter = require('./routes/cooperativas');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);
app.use('/usuarios', usuarioRouter);
app.use('/cuentas', cuentaRouter); // Asegúrate de que esta línea está presente
app.use('/cooperativas', cooperativaRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
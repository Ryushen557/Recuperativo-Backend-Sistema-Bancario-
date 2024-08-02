const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Sistema_Bancario'
});

pool.connect(function(error){
    if (error) {
        console.error('Error conectando a la base de datos:', error);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = pool;

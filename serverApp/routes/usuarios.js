var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco!\n");
});

router.get('/',function(req, res, next){
    connection.query("select * from TB_Usuarios order by nome desc", function(err, result, fields){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

module.exports = router;
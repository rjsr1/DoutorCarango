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

router.post('/cadastrar', function(req, res, fields){
    console.log(req.body);
    var sql = "insert into tb_usuarios (nome, cpf, email, login, senha, localizacao_atual, rua, numero, bairro, cep, estado, pais, complemento, foto_perfil) Values ?"
    var values = [[req.body.nome, req.body.cpf, req.body.email, req.body.login, req.body.senha, req.body.localizacao_atual,
    req.body.rua, req.body.numero,req.body.bairro, req.body.cep, req.body.estado, req.body.pais, req.body.complemento, req.body.foto_perfil]];
    connection.query(sql, [values], function (err, result) {
        if (err){
            res.send({men: "error"});
            throw err;
        } 
        console.log("Number of records inserted: " + result.affectedRows);
        res.send({men: "ok"});
    });
});




module.exports = router;
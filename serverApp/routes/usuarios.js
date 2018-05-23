var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco!\n");
});

//listar todos usuario type=desc(decrente), type=asc(crescente)
router.get('/:type',function(req, res, next){
    var type = req.params.type;
    var sql = "select * from TB_Usuarios order by nome "+type;
    console.log(req.params.id);
    connection.query(sql, function(err, result, fields){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
      return res.send(result);
    });
});
//procurar por id
router.get('/search/:id',function(req,res,next){
    var id = req.params.id;
    var sql = "select * from TB_Usuarios where id = "+id;
    connection.query(sql, function(err, result, fields){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
      return res.send(result);
    });
});
//cadastro
router.post('/cadastrar', function(req, res, fields){
    var sql = "insert into tb_usuarios (nome, cpf, email, login, senha, localizacao_atual, rua, numero, bairro, cep, estado, pais, complemento, foto_perfil) Values ?"
    var values = [[req.body.nome, req.body.cpf, req.body.email, req.body.login, req.body.senha, req.body.localizacao_atual,
    req.body.rua, req.body.numero,req.body.bairro, req.body.cep, req.body.estado, req.body.pais, req.body.complemento, req.body.foto_perfil]];
    connection.query(sql, [values], function (err, result) {
        if (err){
            console.log(err);
           return res.send({men: err.code});
        }
        return res.send({men: "ok"});
    });
});

/*router.patch('/atualizar/:id', function(req,res,fields){
    var sql = "up"



});
*/


module.exports = router;
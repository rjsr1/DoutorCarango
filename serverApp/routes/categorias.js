var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco app, categorias!\n");
});

//listar todos usuario type=desc(decrente), type=asc(crescente)
router.get('/:type',function(req, res, next){
    var type = req.params.type;
    var sql = "select * from TB_Categorias order by categoria "+type;
    console.log(req.params.id);
    connection.query(sql, function(err, result, fields){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
      return res.send(result);
    });
});

//procurar por id, categoria
router.get('/procurar/id=:id&categoria=:categoria',function(req,res,next){
    var id = req.params.id;
    var categoria = req.params.categoria;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(categoria=="*") categoria = "categoria"; else categoria = "'"+categoria+"'";
    var sql = "select * from TB_Categorias where id = "+id+" && "+" categoria = "+categoria;
    console.log(sql);
    connection.query(sql, function(err, result, fields){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
      return res.send(result);
    });
});

//cadastro
router.post('/cadastrar', function(req, res, next){
    var sql = "insert into TB_Categorias (categoria) Values ?"
    var values = [[req.body.categoria]];
    connection.query(sql, [values], function (err, result) {
        if (err){
            console.log(err);
           return res.send({men: err.code});
        }
        return res.send({men: "cadastrado"});
    });
});

//Atualiza passando como parametro o id
router.put('/atualizar/id=:id', function(req,res,next){
    var id = req.params.id;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    var sql = "update TB_Categorias set categoria = '"+req.body.categoria+"' where id = "+id+"";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err){
            console.log(err);
           return res.send({men: err.code});
        }
        return res.send({men: "atualizado"});
    });
});

//deleta passando como parametro id, cpf e ou login
router.delete('/deletar/id=:id&categoria=:categoria', function(req,res,next){
    var id = req.params.id;
    var categoria = req.params.categoria;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(categoria=="*") categoria = "categoria"; else categoria = "'"+categoria+"'";
    sql = "delete from TB_Categorias where id = "+id+" && "+" categoria = "+categoria+"";
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err){
            console.log(err);
           return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});

module.exports = router;
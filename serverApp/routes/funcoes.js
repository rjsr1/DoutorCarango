var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco app, funcoes do app!\n");
});

router.post('/comentarios/cadastrar',function(req, res, next){
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var comentario = req.body.comentario;
    var data_hora = req.body.data_hora;
    var values = [[id_estabelecimentos,id_usuarios,comentario,data_hora]];
    sql = "insert into TB_Comentarios (id_estabelecimentos, id_usuarios, comentario, data_hora) values ?";
    console.log(sql);
    connection.query(sql,[values],function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send({men: "cadastrado"});
    });
});

router.get('/comentarios',function(req, res, next){
    sql = "select * from TB_Comentarios";
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send(result);
    });
});

router.get('/comentarios/id_estabelecimentos=:id_estabelecimentos',function(req, res, next){
    var id_estabelecimentos = req.params.id_estabelecimentos;
    sql = "select * from TB_Comentarios where id_estabelecimentos = "+id_estabelecimentos;
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send(result);
    });
});

router.get('/comentarios/id_usuarios=:id_usuarios',function(req, res, next){
    var id_usuarios = req.params.id_usuarios;
    sql = "select * from TB_Comentarios where id_usuarios = "+id_usuarios;
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send(result);
    });
});

router.put('/comentarios/atualizar/id=:id',function(req, res, next){
    var id = req.params.id;
    var comentario = req.body.comentario;
    sql = "update TB_Comentarios set comentario = '"+comentario+"' where id = "+id;
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send({men: "atualizado"});
    });
});

router.delete('/comentarios/deletar/id=:id',function(req, res,next){
    var id = req.params.id;
    sql = "delete from TB_Comentarios where id = "+id;
    console.log(sql);
    connection.query(sql,function(err,result){
        if(err){
            console.log(err);
            return res.send({men : err.code});
        }
        return res.send({men: "deletado"});
    });
});


module.exports = router;
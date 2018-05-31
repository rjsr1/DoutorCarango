var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco app, categorias!\n");
});

router.get('/agilidade/id_estabelecimentos=:id_estabelecimentos&type=:type',function(req ,res ,next){
    var id_estabelecimentos = req.params.id_estabelecimentos;
    var type = req.params.type;
    var sql = "select * from TB_Av_Agilidade where id_estabelecimentos = "+id_estabelecimentos+" order by nota "+type;
    console.log(sql);
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send(result);
    });
});

router.get('/custo_beneficio/id_estabelecimentos=:id_estabelecimentos&type=:type',function(req ,res ,next){
    var id_estabelecimentos = req.params.id_estabelecimentos;
    var type = req.params.type;
    var sql = "select * from TB_Av_CustoBeneficio where id_estabelecimentos = "+id_estabelecimentos+" order by nota "+type;
    console.log(sql);
    connection.query(sql,function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send(result);
    });
});

router.get('/servico/id_estabelecimentos=:id_estabelecimentos&type=:type',function(req ,res ,next){
    var id_estabelecimentos = req.params.id_estabelecimentos;
    var type = req.params.type;
    var sql = "select * from TB_Av_Servico where id_estabelecimentos = "+id_estabelecimentos+" order by nota "+type;
    console.log(sql);
    connection.query(sql,function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send(result);
    });
});

router.post('/agilidade/cadastrar',function(req, res, next){
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    values = [[id_estabelecimentos, id_usuarios, nota]];
    sql = "insert into TB_Av_Agilidade (id_estabelecimentos, id_usuarios, nota) Values ?";
    console.log(sql);
    connection.query(sql,[values],function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "cadastrado"});
    });
});

router.post('/custo_beneficio/cadastrar',function(req, res, next){
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    values = [[id_estabelecimentos,id_usuarios,nota]];
    sql = "insert into TB_Av_CustoBeneficio (id_estabelecimentos, id_usuarios, nota) Values ?";
    console.log(sql);
    connection.query(sql,[values],function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "cadastrado"});
    });
});

router.post('/servico/cadastrar',function(req, res, next){
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    values = [[id_estabelecimentos,id_usuarios,nota]];
    sql = "insert into TB_Av_Servico (id_estabelecimentos, id_usuarios, nota) Values ?";
    console.log(sql);
    connection.query(sql,[values],function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "cadastrado"});
    });
});

router.put('/agilidade/id=:id',function(req ,res ,next){
    var id = req.params.id;
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    sql = "update TB_Av_Agilidade set id_estabelecimentos = '"+id_estabelecimentos+
    "' , id_usuarios = '"+id_usuarios+"' , nota = '"+nota+"' where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "atualizado"});
    });
});

router.put('/custo_beneficio/id=:id',function(req ,res ,next){
    var id = req.params.id;
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    sql = "update TB_Av_CustoBeneficio set id_estabelecimentos = '"+id_estabelecimentos+
    "' , id_usuarios = '"+id_usuarios+"' , nota = '"+nota+"' where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "atualizado"});
    });
});

router.put('/servico/id=:id',function(req, res, next){
    var id = req.params.id;
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var id_usuarios = req.body.id_usuarios;
    var nota = req.body.nota;
    sql = "update TB_Av_Servico set id_estabelecimentos = '"+id_estabelecimentos+
    "' , id_usuarios = '"+id_usuarios+"' , nota = '"+nota+"' where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "atualizado"});
    });
});

router.delete('/agilidade/id=:id', function(req, res, next){
    var id = req.params.id;
    sql = "delete from TB_Av_Agilidade where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});

router.delete('/custo_beneficio/id=:id', function(req, res, next){
    var id = req.params.id;
    sql = "delete from TB_Av_CustoBeneficio where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});

router.delete('/servico/id=:id', function(req, res, next){
    var id = req.params.id;
    sql = "delete from TB_Av_Servico where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});


module.exports = router;

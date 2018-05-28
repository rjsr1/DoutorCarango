var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco, app usuarios!\n");
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
//procurar por id, nome e ou cpf
router.get('/procurar/id=:id&nome=:nome&cpf=:cpf&login=:login',function(req,res,next){
    var id = req.params.id;
    var nome = req.params.nome;
    var cpf = req.params.cpf;
    var login = req.params.login;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(nome=="*") nome = "nome"; else nome = "'"+nome+"'";
    if(cpf=="*") cpf = "cpf"; else cpf = "'"+cpf+"'";
    if(login=="*") login = "login"; else login = "'"+login+"'";
    var sql = "select * from TB_Usuarios where id = "+id+" && "+" nome = "+nome+" && "+" cpf = "+cpf+" && "+" login = "+login;
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
    var sql = "insert into tb_usuarios (nome, cpf, email, login, senha, localizacao_atual, rua, numero, bairro, cidade, cep, estado, pais, complemento, foto_perfil) Values ?"
    var values = [[req.body.nome, req.body.cpf, req.body.email, req.body.login, req.body.senha, req.body.localizacao_atual,
    req.body.rua, req.body.numero,req.body.bairro,req.body.cidade, req.body.cep, req.body.estado, req.body.pais, req.body.complemento, req.body.foto_perfil]];
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
    var sql = "update TB_Usuarios set nome = '"+req.body.nome+"', cpf = '"+req.body.cpf+
    "', email = '"+req.body.email+"' , "+" login = '"+req.body.login+"' , "+
    " senha = '"+req.body.senha+"' , "+" localizacao_atual = '"+req.body.localizacao_atual+"' , "+
    " rua = '"+req.body.rua+"' , "+" numero = '"+req.body.numero+"' , "+" bairro = '"+req.body.bairro+"' , "+
    " cidade = '"+req.body.cidade+"' ,"+" cep = '"+req.body.cep+"' ,"+" estado = '"+req.body.estado+"' , "+" pais = '"+req.body.pais+"' , "+" complemento = '"+req.body.complemento+"' , "+
    " foto_perfil = '"+req.body.foto_perfil+"' where id = "+id;
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
router.delete('/deletar/id=:id&cpf=:cpf&login=:login', function(req,res,next){
    var id = req.params.id;
    var cpf = req.params.cpf;
    var login = req.params.login;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(cpf=="*") cpf = "cpf"; else cpf = "'"+cpf+"'";
    if(login=="*") login = "login"; else login = "'"+login+"'";
    sql = "delete from TB_Usuarios where id = "+id+" && "+" cpf = "+cpf+" && "+" login = "+login;
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err){
            console.log(err);
           return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});

router.get('/telefones/id_usuarios=:id_usuarios',function(req, res, next){
    var id_usuarios = req.params.id_usuarios;
    sql = "select id , telefone from TB_Telefones_Usuarios where id_usuarios = "+id_usuarios;
    console.log(sql);
    connection.query(sql,function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send(result);
    });
});

router.post('/telefones/cadastrar', function(req, res, next){
    var id_usuarios = req.body.id_usuarios;
    var telefone = req.body.telefone;
    var values = [[id_usuarios,telefone]];
    sql = "insert into TB_Telefones_Usuarios (id_usuarios, telefone) Values ?";
    console.log(sql);
    connection.query(sql, [values], function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "cadastrado"})
    });
});

router.put('/telefones/atualizar/id=:id', function(req, res, next){
    var id = req.params.id;
    var telefone = req.body.telefone;
    sql = "update TB_Telefones_Usuarios set telefone = '"+telefone +"' where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "atualizado"});
    });
});

router.delete('/telefones/deletar/id=:id', function(req, res, next){
    var id = req.params.id;
    sql = "delete from TB_Telefones_Usuarios where id = "+id;
    console.log(sql);
    connection.query(sql, function(err, result){
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send({men: "deletado"});
    });
});

module.exports = router;
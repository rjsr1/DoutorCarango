var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco app, estabelecimentos!\n");
});

//listar todos usuario type=desc(decrente), type=asc(crescente)
router.get('/:type',function(req, res, next){
    var type = req.params.type;
    var sql = "select * from TB_Estabelecimentos order by nome "+type;
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
router.get('/procurar/id=:id&nome=:nome&cnpj=:cnpj&login=:login',function(req,res,next){
    var id = req.params.id;
    var nome = req.params.nome;
    var cnpj = req.params.cnpj;
    var login = req.params.login;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(nome=="*") nome = "nome"; else nome = "'"+nome+"'";
    if(cnpj=="*") cnpj = "cnpj"; else cnpj = "'"+cnpj+"'";
    if(login=="*") login = "login"; else login = "'"+login+"'";
    var sql = "select * from TB_Estabelecimentos where id = "+id+" && "+" nome = "+nome+" && "+" cnpj = "+cnpj+" && "+" login = "+login;
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
    var sql = "insert into TB_Estabelecimentos (nome, cnpj, email, login, senha, rua, numero, bairro,"+ 
        "cep, estado, pais, complemento, rankingAgilidade, rankingCustoBeneficio, RankingServico) Values ?";
    var values = [[req.body.nome, req.body.cnpj, req.body.email, req.body.login, req.body.senha,
    req.body.rua, req.body.numero,req.body.bairro, req.body.cep, req.body.estado, req.body.pais,
     req.body.complemento, 0, 0, 0]];
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
    var sql = "update TB_Estabelecimentos set nome = '"+req.body.nome+"', cnpj = '"+req.body.cnpj+
    "', email = '"+req.body.email+"' , "+" login = '"+req.body.login+"' , "+
    " senha = '"+req.body.senha+"' , "+" rua = '"+req.body.rua+"' , "+" numero = '"+req.body.numero+"' , "+" bairro = '"+req.body.bairro+"' , "+
    " estado = '"+req.body.estado+"' , "+" pais = '"+req.body.pais+"' , "+" complemento = '"+req.body.complemento+"'"+
    " where id = "+id;
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
router.delete('/deletar/id=:id&cnpj=:cnpj&login=:login', function(req,res,next){
    var id = req.params.id;
    var cnpj = req.params.cnpj;
    var login = req.params.login;
    if(id=="*") id = "id"; else id = "'"+id+"'";
    if(cnpj=="*") cnpj = "cnpj"; else cnpj = "'"+cnpj+"'";
    if(login=="*") login = "login"; else login = "'"+login+"'";
    sql = "delete from TB_Estabelecimentos where id = "+id+" && "+" cnpj = "+cnpj+" && "+" login = "+login;
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
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

//verificar quais as oficinas fazem quais serviços
router.get('/categoria/:tipo', function (res, req, next) {
    var filter = req.params.tipo;
    var idCategoria = "select * from tb_categorias where categoria = " + filter;
    var getEstabelecimentos = "select id_estabelecimentos from tb_estabelecimentos_categorias where id_categorias = " + idCategoria;
    var sql = "select * from tb_estabelecimentos where id = (" + getEstabelecimentos + ")";
    connection.query(sql, function (err, result) {
        if(err){
            console.log(err);
            return res.send({men: err.code});
        }
        return res.send(result)
    })
});


//1 = Agilidade
//2 = Preço Baixo
//3 = Serviço
//ordena oficinas pelo rank escolhido
router.get('/filter/:order', function (req, res, next) {
    var order = req.params.order;
    var filter;
    if (order == 1) {
        filter = "rankingAgilidade";
    }
    if (order == 2) {
        filter = "rankingCustoBeneficio";
    }
    if (order == 3) {
        filter = "rankingServico";
    }
    var sql = "select * from TB_Estabelecimentos order by " + order;
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
            return res.send({ men: err.code })
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
    var sql = "insert into TB_Estabelecimentos (nome, cnpj, email, login, senha, rua, numero, bairro, cidade,"+ 
        "cep, estado, pais, complemento, rankingAgilidade, rankingCustoBeneficio, RankingServico) Values ?";
    var values = [[req.body.nome, req.body.cnpj, req.body.email, req.body.login, req.body.senha,
    req.body.rua, req.body.numero,req.body.bairro,req.body.cidade, req.body.cep, req.body.estado, req.body.pais,
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
    "cep = '"+req.body.cep+"',"+" cidade = '"+req.body.cidade+"', "+" estado = '"+req.body.estado+"' , "+" pais = '"+req.body.pais+"' , "+" complemento = '"+req.body.complemento+"'"+
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

router.get('/telefones/id_estabelecimentos=:id_estabelecimentos',function(req, res, next){
    var id_estabelecimentos = req.params.id_estabelecimentos;
    sql = "select id , telefone from TB_Telefones_Estabelecimentos where id_estabelecimentos = "+id_estabelecimentos;
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
    var id_estabelecimentos = req.body.id_estabelecimentos;
    var telefone = req.body.telefone;
    var values = [[id_estabelecimentos,telefone]];
    sql = "insert into TB_Telefones_Estabelecimentos (id_estabelecimentos, telefone) Values ?";
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
    sql = "update TB_Telefones_Estabelecimentos set telefone = '"+telefone +"' where id = "+id;
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
    sql = "delete from TB_Telefones_Estabelecimentos where id = "+id;
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
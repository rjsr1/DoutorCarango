var express = require('express');
var router = express.Router();
var config = require ('../config');
var mysql = require('mysql');

connection = mysql.createConnection(config.database);
connection.connect(function(err){
    if(err) throw err;
    console.log("Conexao estabelecida com o banco app, login!\n");
});

global.db = connection;


router.get('/signup', function(req, res, next) {
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var nome = post.nome;
      var cpf = post.cpf;
      var email = post.email;
      var login = post.login;
      var senha= post.senha;
      var loc_atual = post.localizacao_atual;
      var rua = post.rua;
      var numero = post.numero;
      var bairro = post.bairro;
      var cidade = post.cidade;
      var cep = post.cep;
      var estado = post.estado;
      var pais = post.pais;
      var complemento = post.complemento;
      var perfil_pic = post.foto_perfil;

      var sql = "INSERT INTO 'TB_Usuarios'('nome','cpf','email','login', 'senha', 'loc_atual','rua', 'numero', 'bairro', 'cidade', 'cep', 'estado', 'pais', 'complemento', 'perfil_pic')  VALUES ('" + nome + "','" + email + "','" + login + "','" + senha + "','" + cpf + "')";

      var query = db.query(sql, function(err, result) {

         message = "Conta criada com sucesso (:";
         //res.render('signup.ejs',{message: message});
      });

   } else {
      //res.render('signup.ejs');
   }
});
 

router.get('/login', function(req, res, next) {
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var login = post.login;
      var pass= post.senha;
     
      var sql="SELECT id, nome, login FROM 'TB_Usuarios' WHERE 'login'='"+login+"' and senha = '"+pass+"'";   

      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            //res.redirect('/home/dashboard');  //nao concluido
         }
         else{
            message = 'Algo está errado';
            //res.render('index.ejs',{message: message});  //necessario fazer page de retorno
         }
                 
      });
   } else {
      //res.render('index.ejs',{message: message}); //page de retorno
   }
           
});

           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;  //nao concluido, funcao para depois de logar     
};

exports.logout=function(req,res){
   req.session.destroy(function(err) {
      //res.redirect("/login");   //page de retorno mais uma vez
   })
};


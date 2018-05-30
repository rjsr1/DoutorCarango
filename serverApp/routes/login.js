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

module.exports = function (app) {

	app.get('/login', function (req, res, next) {
		message = " ";
		res.render('index.ejs', {message: message} );
	});

	app.post('/login', function (req, res, next) {
		
		var login = req.body.username;
		var pass  = req.body.password;
		var sess = req.session; 
		
		var sql="SELECT id, `nome`,`cpf`,`email`,`login`, `senha` FROM `tb_usuarios` WHERE `login`='"+login+"' and senha = '"+pass+"'";                           
      
		db.query(sql, function(err, results){      
         if(results.length){
            res.redirect('/users');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }                
      });
	});
	
	app.get('/signup', function (req, res, next) {
		message = " ";
		res.render('signup.ejs', {message: message} );
	});	

	app.post('/signup', function (req, res, next) {
		var post  = req.body;
		var nome  = post.nome;
		var cpf   = post.cpf;
		var email = post.email;
		var login = post.login;
		var senha = post.senha;
		var loc_a = post.localizacao_atual;
		var rua   = post.rua;
		var num   = post.numero;
		var bairro= post.bairro;
		var cidade= post.cidade;
		var cep   = post.cep;
		var estado= post.estado;
		var pais  = post.pais;
		var comp  = post.complemento;
		var fot_p = post.foto_perfil;

		var sql = "INSERT INTO tb_usuarios (nome, cpf, email, login, senha, localizacao_atual, rua, numero, bairro, cidade, cep, estado, pais, complemento, foto_perfil) Values ?"
		var query = db.query(sql, function(err, result) {

         message = "Conta criada com sucesso!";
         res.render('signup.ejs',{message: message}); //tela de redirecionamento mudar campos
		});
	});
	
	app.get('/logout', function (req, res, next) {
		delete req.session.authenticated;
		res.redirect('/');
	});

};
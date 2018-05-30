var express = require('express');
var router = express.Router();

var mysql      = require('mysql');
var connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : '',
              database : 'doutorcarango'
            });
 
connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*
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
            res.render('index.ejs',{message: message});  //necessario fazer page de retorno
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message}); //page de retorno
});

router.get('/signup', function(req, res, next) {
   message = '';
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
         res.render('signup.ejs',{message: message});
      });

   
});

*/

module.exports = router;

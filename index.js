const express = require('express');
const app = express();
const config = require('./config.json');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: config.mysql.ip,
  user: config.mysql.usuario,
  password: config.mysql.senha,
  database: config.mysql.database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("[MySQL]", "Conectado com sucesso!");
});
var  datetime = new Date();

app.get('/:licenca', function(req,res){
	var timestamp = new Date().getTime();
	con.query(`SELECT * FROM licencas WHERE licenca = '${req.params.licenca}'`, function (err, row) {
    if (row && row.length ) {
     if(row[0].end_time == datetime){
      res.json({key:req.params.licenca,response:"Sua licença esta vencida",due_date:row[0].end_time,domain:row[0].domain,host:row[0].hostname,code:200});

     }else{
      res.json({key:req.params.licenca,response:"Sua licença esta válida",due_date:row[0].end_time,domain:row[0].domain,host:row[0].hostname,code:200 });
     }
      } else {
        res.json({key:req.params.licenca,response:'Sua licença esta inválida',code:404});
      }
  });
});



app.listen(config.porta, function(){
	console.log(`Rodando na porta`,config.porta);
});
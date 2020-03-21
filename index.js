const express = require('express');
const app = express();
const config = require('./config.json');
const mysql = require('mysql');
var datetime = new Date();

var con = mysql.createConnection({
  host: config.mysql.ip,
  user: config.mysql.usuario,
  password: config.mysql.senha,
  database: config.mysql.database
});

con.connect(function (err) {
  if (err) throw err;
  console.log("[MySQL]", "Conectado com sucesso!");
});


function formatDate(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + "-" + month + "-" + day;
}


app.get('/check/:licenca', function (req, res) {
  res.set('Content-Type', 'application/json');
  

  var timestamp = new Date().getTime();
  con.query(`SELECT * FROM api_keys WHERE _key = '${req.params.licenca}'`, function (err, row) {
    if (row && row.length) {
      if (!((row[0].end_time.split("-")[1] <= formatDate(datetime).split("-")[1]) && (row[0].end_time.split("-")[0] <= formatDate(datetime).split("-")[0]) && (row[0].end_time.split("-")[2] <= formatDate(datetime).split("-")[2]))) {
        res.set('X-Powered-By', 'JVinicius-'+ req.params.licenca);
        res.status(200).json({ key: req.params.licenca, response: "Sua licença esta válida", due_date: row[0].end_time, domain: row[0].domain, host: row[0].hostname, code: 200 });
    

      } else {
        res.status(403).json({ key: req.params.licenca, response: "Sua licença esta vencida", due_date: row[0].end_time, domain: row[0].domain, host: row[0].hostname, code: 403 });
      }
    } else {
      res.status(404).json({ key: req.params.licenca, response: 'Sua licença esta inválida', code: 404 });
    }
  });
});


app.listen(config.porta, function () {
  console.log(`Rodando na porta`, config.porta);
});

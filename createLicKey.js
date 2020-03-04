const uuid = require(`uuid-random`);


const config = require(`./config.json`);
const mysql = require(`mysql`);

var con = mysql.createConnection({
    host: config.mysql.ip,
    user: config.mysql.usuario,
    password: config.mysql.senha,
    database: config.mysql.database
});

con.connect(function (err) {
    if (err) throw err;
    console.log("[MySQL]", "Conectado com sucesso!");
    var datetime = new Date();
let uuidKey = uuid();
    let domain = process.argv[2];
    let hostname = process.argv[3];

    datetime.setDate(datetime.getDate() + Number(process.argv[4]));
    //(`"+datetime+"`,`"+domain+"`,`"++"`,`"+hostname+"`)
    function formatDate(date) {
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 101).toString().substring(1);
        var day = (date.getDate() + 100).toString().substring(1);
        return year + "-" + month + "-" + day;
    }
    con.query("INSERT INTO `licencas`(`end_time`, `domain`, `licenca`, `hostname`) VALUES (?,?,?,?)",[formatDate(datetime),domain,uuidKey,hostname], function (err, row) {
        if (!err) {
            console.log("License Key: " + uuidKey);
            console.log("Domain: " + domain);
            console.log("Machine IP: " + hostname);
            console.log("Due Date: " + formatDate(datetime));



        }else{
            console.error(err);
            
        }
    });
    con.end();
});

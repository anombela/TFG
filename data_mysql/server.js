var express    = require("express");
var mysql  = require('mysql');

var dbconn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  //password : 'TFG_TAXIS', //no tiene password, porque se lo hemos quitado
  database : 'TFG_TAXIS'
});

var app = express();

dbconn.connect(function(err){
  if(err){
    console.log('Database connection error');
  }else{
    console.log('Database connection successful');
  }
});


//wsto solo hace falta si usamos json y no jsonp

function perimitirCrossDomain(req, res, next) {
  //en vez de * se puede definir SÓLO los orígenes que permitimos
  res.header('Access-Control-Allow-Origin', '*'); 
  //metodos http permitidos para CORS
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

 app.use(perimitirCrossDomain);
app.listen(3000);

app.get('/TFG_TAXIS/:procedure/:parametres', (req, res) => {

    const procedure = req.params.procedure;
    var parametres = req.params.parametres;
    parametres = parametres.split(',');

    if (parametres[0] == 'null')
        parametres = []; //se vacía

    var x = "("
    for (var i = 0; i < parametres.length; i++){
        x += "?";
        if (i != parametres.length- 1) 
          x += ",";
    }
    x += ")";


    dbconn.query("call "+ procedure + x,parametres, function (err, result,fields) {
      if (!err) {
          console.log("success");
        //console.log(result);
        //console.log(fields);
        return res.status(200).jsonp({
        status: 'success',
        data: result
        });
    } else {
        console.log('Error while performing Query.');
        console.log(err.code);
        console.log(err.message);

    }
      
    });


    
})

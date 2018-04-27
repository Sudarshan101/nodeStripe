var express = require('express');
var morgan = require('morgan');        
var bodyParser = require('body-parser'); 
var methodOverride = require('method-override');
var stripe = require('stripe')('*******************************');
var app = express();

//allow cross origin requests
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
// configuration
app.use(express.static(__dirname + '/www'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));              
app.use(bodyParser.json({limit: '50mb'}));                          // log every request to the console
app.use(bodyParser.urlencoded({limit: '50mb','extended':'true'}));            // parse application/x-www-form-urlencoded                                // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

app.get('/', function (req, res) {
  res.sendfile('./www/index.html')
})

app.post('/api/checkout', function(req, res) {
  console.log(req.body);
    var token = req.body.token;
    var chargeAmount = req.body.amount;
    var discription = req.body.discription;
    let amount = chargeAmount;

    stripe.customers.create({
        email: req.body.email,
        card: token
    })
    .then(customer =>
        stripe.charges.create({
          amount,
          description: discription,
          currency: "usd",
          customer: customer.id
    }))
    .then(charge => {
         res.json({"payment":charge, "order": "Done"});
        
    })
    .catch(err => {
        console.log("Error:", err);
        res.status(500).json({error: "Purchase Failed"});
      });
});
app.listen(process.env.PORT || 3000, function(){console.log("App listening on port 3000");});
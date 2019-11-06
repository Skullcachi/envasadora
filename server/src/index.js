const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');
// importing routes
const orderRoutes = require('./routes');
//settings
app.set('port', process.env.PORT || 3000);

//headers para CORS
var originsWhitelist = [
    'http://localhost:4200'
     //'http://instancia-aws'
];
var corsOptions = {
origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
},
credentials:true
}

app.use(cors(corsOptions));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


//routes
app.use('/api', require('./routes/'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});
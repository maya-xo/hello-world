const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.set('port', process.env.PORT || 3000);


app.use(bodyparser.urlencoded({ extended: false}));

app.use(bodyparser.json());

app.use(express.static('public'));
app.use(express.static('public/img'));


//Templates
app.engine('hbs', exphbs({extname: '.hbs'}));
app.set('view engine', 'hbs');



//router
const routes = require('./routes/products');
app.use('/', routes);

app.listen(app.get('port'), () =>{
    console.log('Server on port: ', app.get('port'));
}); 
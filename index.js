const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const exphbs  = require('express-handlebars');
require('dotenv').config()

// personal modules
const routerController = require('./backend/router')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.use(express.static('dist')); 
app.use(mongoSanitize());
app.engine('handlebars', exphbs({ 
	defaultLayout: 'layout',
	layoutsDir   : 'backend/view/layouts',
    partialsDir  : 'backend/view',
}));
app.set('view engine', 'handlebars');
app.use((req, res, next) => {
  	if(req.headers['x-forwarded-proto'] === 'https'){
		res.redirect('http://' + req.hostname + req.url);
  	}else{
      	next();
  	}
})

mongoose.connect(
    process.env.DB_URL, 
    { useNewUrlParser: true },
    ()=>{ console.log('Connected to Mongodb') }
);

routerController(app)


const PORT = parseInt(process.env.PORT) || 3000
app.listen(PORT, () => { console.log('Express server is up on port ' + PORT) });

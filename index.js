const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')
const logger = require('./backend/service/logger')
require('dotenv').config()

// personal modules
const routerController = require('./backend/router')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public')); 
app.use(mongoSanitize());
app.use(cookieParser())
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
    ()=>{ logger.info('Connected to Mongodb') }
);

routerController(app)

const PORT = parseInt(process.env.PORT) || 3000
app.listen(PORT, () => { logger.info('Express server is up on port ' + PORT) });

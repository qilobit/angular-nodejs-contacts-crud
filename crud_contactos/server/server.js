const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contact');
const phoneRoutes = require('./routes/phone');
const PORT = process.env.PORT || config.app_port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const allowedOrigin = process.env.NODE_ENV == 'production' ? config.production_client_url : '*';

console.log('==> allowedOrigin: ',allowedOrigin);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", allowedOrigin); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use('/contact', contactRoutes);
app.use('/phone', phoneRoutes);
app.get('/', (req, res) => res.send('<h2>Contactos crud Api</h2>'));

mongoose.connect(config.db_url, {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
.then(con => {
    
  app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`);
  });

})
.catch(e => {

  console.log('Error connecting to DB');
  console.log(e);

});


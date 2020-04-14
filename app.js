const express = require('express')
const routes = require('./routes/index.js')
const http = require('http')
const app = express()
const influx = require('./models/tempModel')

influx.getDatabaseNames()
  .then(names => {
    if (!names.includes('sauna_db')) {
      return influx.createDatabase('sauna_db');
    }
  })
  .catch(err => {
    console.error(`Error creating Influx database!`, err);
    return process.exit(1)
  })

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

routes(app)

module.exports = app
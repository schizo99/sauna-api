const influx = require('../models/tempModel')

const addTemp = (req, res) => {
  influx.writePoints([
    {
      measurement: 'temperatures',
      fields: { temp: req.body.temp },
    }
  ]).then(result => {
    res.status(200).json(result)
  }).catch(err => {
    res.status(500).send(`Error saving data to InfluxDB! ${err.stack}`)
  })
};

const getTemp = (req, res) => {
  influx.query(`
    select last("temp") from temperatures
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
}

const getTemps = (req, res) => {
  const hours = req.params.hours;
  influx.query(`
    select * from temperatures where time > now() - ${hours}h
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
}

module.exports = { addTemp, getTemp, getTemps }
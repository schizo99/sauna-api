const influx = require('../models/tempModel')
const axios = require('axios')

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

const sendSignal = (req, res) => {
  const temp = req.body.temp / 100;
  
  axios.post(`https://api.telegram.org/bot${process.env.TOKEN}/sendMessage`, {
    chat_id: process.env.CHAT_ID,
    text: `Sauna temp has passed: ${temp} C`
  })
  .then(() => res.json({'Temp': 'sent'}))
  .catch((error) => {
    console.error(error)
  })
}

const getTemps = (req, res) => {
  const days = req.params.days;
  const hours = req.params.hours
  const aggregation = 10 * days * hours;
  influx.query(`
    SELECT FIRST(temp) as temp
    FROM temperatures where time > now() - ${days}d
    GROUP BY time(${aggregation}s)
  `).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).send(err.stack)
  })
}

module.exports = { addTemp, getTemp, getTemps, sendSignal }
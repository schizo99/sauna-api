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
  const days = req.params.days;
  const aggregation = 16 * days * 24;
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

module.exports = { addTemp, getTemp, getTemps }
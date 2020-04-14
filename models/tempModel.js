const Influx = require('influx')
const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST || 'localhost',
  database: 'sauna_db',
  schema: [
    {
      measurement: 'temperatures',
      fields: {
        temp: Influx.FieldType.INTEGER
      },
      tags: ['sauna']
    }
  ]
})

module.exports = influx
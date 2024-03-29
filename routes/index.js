const temperature = require('../controllers/tempController')

const app = (app) => {
  app.route('/temp')
    .get(temperature.getTemp)
    .post(temperature.addTemp)
  app.route('/temps/:days/:hours')
    .get(temperature.getTemps)
  app.route('/send')
    .post(temperature.sendSignal)
  app.route('/starts')
    .get(temperature.getTimes)
} 

module.exports = app
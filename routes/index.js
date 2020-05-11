const temperature = require('../controllers/tempController')

const app = (app) => {
  app.route('/temp')
    .get(temperature.getTemp)
    .post(temperature.addTemp)
  app.route('/temps/:days')
    .get(temperature.getTemps)
} 

module.exports = app
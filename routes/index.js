const temperature = require('../controllers/tempController')

const app = (app) => {
  app.route('/temp')
    .get(temperature.getTemps)
    .post(temperature.addTemp)
} 

module.exports = app
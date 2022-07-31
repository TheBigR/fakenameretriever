const fakeNamesController = require('../controllers/fakeNames')

module.exports = (app) => {
  app.get('/up-time-check', (req, res, next) => {
    res.send('working')
  })

  app.get('/getfakenames', fakeNamesController.getFakeNames)

  //fakeNames
}

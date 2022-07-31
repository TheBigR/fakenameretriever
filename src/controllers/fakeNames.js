const { getFakeNames } = require('../services/fakeNames')

module.exports = {
  getFakeNames: async (req, res, next) => {
    try {
      const namesResults = await getFakeNames()
      res.status(200).send(namesResults)
    } catch (e) {
      res.status(500).send(e)
    }
  },
}

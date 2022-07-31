const rp = require('request-promise')

module.exports = {
  getFakeNames: async () => {
    const initTime = Date.now()
    const toPromise = []
    const indexObj = {}
    const options = {
      method: 'GET',
      uri: 'https://www.fakenamegenerator.com/',
    }

    const getRequest = () => {
      return rp(options).then((res) => {
        const nameStart = res.indexOf(`class=\"address\"`) + 61
        const novaRes = res.substring(nameStart)
        const nameEndIndex = novaRes.indexOf('<')
        const fullName = novaRes.substring(0, nameEndIndex)
        return fullName
      })
    }

    const indexUpdater = (name) => {
      if (indexObj[name]) {
        indexObj[name] = indexObj[name] + 1
      } else {
        indexObj[name] = 1
      }
    }

    const highestFinder = (obj, num = 1, initTime) => {
      const requiredObj = {}
      if (num > Object.keys(obj).length) {
        return false
      }
      Object.keys(obj)
        .sort((a, b) => obj[b] - obj[a])
        .forEach((key, ind) => {
          if (ind < num) {
            requiredObj[key] = obj[key]
          }
        })
      const duration = (Date.now() - initTime) / 1000
      return { duration, values: requiredObj }
    }

    for (let i = 1; i <= 100; i += 1) {
      toPromise.push(getRequest())
    }
    const res = await Promise.all(toPromise)
    for (let i = 0; i < res.length; i += 1) {
      const firstName = res[i].substring(0, res[i].indexOf(' '))
      const lastName = res[i].substring(res[i].indexOf('.') + 2)
      indexUpdater(firstName)
      indexUpdater(lastName)
    }
    const data = highestFinder(indexObj, 10, initTime)

    return data
  },
}

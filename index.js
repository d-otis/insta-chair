const getUnsoldChairs = require('./src/getUnsoldChairs')
const sendEmail = require('./src/sendEmail')

;(async () => {
  const chairs = await getUnsoldChairs()
  sendEmail(chairs)
})()
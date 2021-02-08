const getUnsoldChairs = require('./src/getUnsoldChairs')
const sendEmail = require('./src/sendEmail')

;(async () => {
  console.log(`starting INSTA-CHAIR @ ${new Date().toLocaleString()}`)
  const chairs = await getUnsoldChairs()
  sendEmail(chairs)
})()
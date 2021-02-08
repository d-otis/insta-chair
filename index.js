const getUnsoldChairs = require('./src/getUnsoldChairs')
const sendEmailWith = require('./src/sendEmail')

;(async () => {
  // const chairs = await getUnsoldChairs()
  const chairs = []
  sendEmailWith(chairs)
})()
const getChairs = require('./src/getChairs')
const sendEmail = require('./src/sendEmail')
const savedChairs = require('./src/savedPosts.json')
const persistChairs = require('./src/persistChairs')

;(async () => {
  console.log(`starting INSTA-CHAIR @ ${new Date().toLocaleString()}`)

  const chairs = await getChairs(savedChairs.map(chair => chair.postId))
  
  persistChairs([ ...savedChairs, ...chairs.sold ])

  sendEmail(chairs.unsold)
})()
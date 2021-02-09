const fs = require('fs')

const persistChairs = chairs => {
  console.log('saving chairs...')
  
  let json = JSON.stringify(chairs, null, 2)

  fs.writeFileSync(`${__dirname}/savedPosts.json`, json, err => {
    if (err) throw err
    console.log('data written')
  })
}

module.exports = persistChairs
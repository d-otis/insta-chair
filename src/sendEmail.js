const ejs = require('ejs')
const fs = require('fs')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })
// const template = require('./template.ejs')

// const chairs = [
//   {
//     postId: 1234,
//     caption: "Excepteur sunt laboris cupidatat nulla proident qui minim ea fugiat incididunt. Eiusmod mollit consectetur laboris Lorem tempor ullamco quis ut fugiat proident occaecat aliquip amet cupidatat. Ea adipisicing elit ad duis labore non eu ut esse nisi. Aliquip ut commodo tempor pariatur sunt.",
//     comments: [],
//     url: 'https://www.google.com',
//     thumbnail: "https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs"
//   },
//   {
//     postId: 5678,
//     caption: "Excepteur sunt laboris cupidatat nulla proident qui minim ea fugiat incididunt. Eiusmod mollit consectetur laboris Lorem tempor ullamco quis ut fugiat proident occaecat aliquip amet cupidatat. Ea adipisicing elit ad duis labore non eu ut esse nisi. Aliquip ut commodo tempor pariatur sunt.",
//     comments: [],
//     url: 'https://www.bing.com',
//     thumbnail: "https://i.picsum.photos/id/101/2621/1747.jpg?hmac=cu15YGotS0gIYdBbR1he5NtBLZAAY6aIY5AbORRAngs"
//   }
// ]

const renderTemplate = chairs => {
  const template = fs.readFileSync(__dirname +"/template.ejs", 'utf8' )
  const html = ejs.render(template, { chairs })
  return html
}

const sendEmail = chairs => {
  const html = renderTemplate(chairs)

  const mail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USR_FROM,
      pass: process.env.EMAIL_APP_PWD
    }
  })

  const mailData = {
    from: process.env.GMAIL_USR_FROM,
    to: process.env.GMAIL_USR_TO,
    subject: `Jinxed Has ${chairs.length} Chairs!`,
    html
  }

  mail.sendMail(mailData, (err, info) => {
    console.log(`Sending email with ${chairs.length} chairs`)
    console.log(err ? err : `Email sent with ${info.response}`)
    console.log("============================================")
  })

}

module.exports = sendEmail
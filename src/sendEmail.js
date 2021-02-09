const ejs = require('ejs')
const fs = require('fs')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config({ path: __dirname + '/../.env' })

const renderTemplate = chairs => {
  const template = fs.readFileSync(__dirname +"/template.ejs", 'utf8' )
  const html = ejs.render(template, { chairs })
  return html
}

const sendEmail = chairs => {
  // chairs : Array of objects
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
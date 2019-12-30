const nodemailer = require('nodemailer')

module.exports = {
  transport: nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'daa3ded7ea5ad4',
      pass: '0d79b96d09d593'
    }
  }),

  emailContent: (from, to, subject, message) => {
    return {
      from: 'elonmusk@tesla.com',
      to: to,
      subject: subject,
      html: message
    }
  }
}

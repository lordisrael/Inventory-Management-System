const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendEmail = async(option) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        }
    })
    const emailOptions = {
        from: "LI support<support@li.com",
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    try {
        await transport.sendMail(emailOptions)
        console.log('Email sent successfully')
    } catch {
        console.log('Failed to send email: ', error)
    }
}

module.exports = sendEmail
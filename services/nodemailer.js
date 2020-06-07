'use strict'

var nodemailer = require('nodemailer');

let emailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreply.pmsquiz@gmail.com',
        pass: process.env.EPASS
    }
});

let link = "https://pms-quiz.herokuapp.com/";

function sendEmail (mailOptions) {
    emailer.sendMail(mailOptions, function(err , info) {
        if (err) {
            console.log(err);
        } else {
            console.log("Email sent to \"" + emailTarget + "\" " + info.response);
        }
    });
}

exports.sendResultEmail = (emailTarget, token) => {
    
    let mailOptions = {
        from: 'CMS <cmslums@gmail.com>',
        to: emailTarget,
        subject: 'PMS Quiz Result',
        html: `<h1>PMS Quiz Result</h1><p>Open this link to view your result: ${link}?token=${token}</p>`
    };
    
    sendEmail(mailOptions);
}
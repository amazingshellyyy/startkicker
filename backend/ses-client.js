const AWS = require('aws-sdk');

const config = require('./config'); // load configurations file

AWS.config.update({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.ses.region
});

const ses = new AWS.SES({apiVersion: '2010-12-01'});

const sendEmail = (to, subject, message, from,res,jwt,userId) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: from ? from : config.aws.ses.from.default,
        Source: from ? from : config.aws.ses.from.default,
    };

    ses.sendEmail(params, (err, data) => {
        if (err) return console.log(err, err.stack);
        console.log("Email sent.", data);
        res.status(200).json({ jwt , userId });
    });
};

module.exports = {sendEmail};
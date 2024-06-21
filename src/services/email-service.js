const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
    apiKey: process.env.MAIL_API_KEY,
    apiSecret: process.env.MAIL_API_SECRET
});

async function send(params) {
    return mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: params.from.email,
                        Name: params.from.name
                    },
                    To: [
                        {
                            Email: params.to.email,
                            Name: params.to.name
                        }
                    ],
                    Subject: params.subject,
                    HTMLPart: params.body
                }
            ]
        });
}

module.exports = {
    send
}

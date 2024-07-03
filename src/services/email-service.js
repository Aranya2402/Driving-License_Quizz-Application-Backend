const Mailjet = require('node-mailjet');

const mailjet = new Mailjet({
    apiKey: process.env.MAIL_API_KEY,
    apiSecret: process.env.MAIL_API_SECRET
});

async function send(params) {
    try {
        const { from, to, subject, body, text, attachments } = params;

        // Validate required parameters
        if (!from || !from.email || !to || !to.email || !subject || !attachments) {
            throw new Error('Missing required parameters in email send request');
        }

        const mailResponse = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: from.email,
                            Name: from.name || ''
                        },
                        To: [
                            {
                                Email: to.email,
                                Name: to.name || ''
                            }
                        ],
                        Subject: subject,
                        HTMLPart: body || '<h3>Abcd</h3>', // Adding HTMLPart
                        TextPart: text || 'Default text content', // Optionally adding TextPart
                        Attachments: attachments.map(attachment => ({
                            ContentType: attachment.contentType,
                            Filename: attachment.filename,
                            Base64Content: attachment.content
                        }))
                    }
                ]
            });

        return mailResponse;
    } catch (error) {
        throw new Error(`Error sending email: ${error.message}`);
    }
}

module.exports = {
    send
};

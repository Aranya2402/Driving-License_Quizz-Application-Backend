const express = require('express');
const router = express.Router();
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const mailService = require('../../services/email-service');
const certificateTemplate = require("./certificates/CertificateTemplate");

// Function to generate PDF
const createPdf = (req, res) => {
    const html = certificateTemplate(req.body);
    const pdfPath = path.join(__dirname, "..", "DCertificate", "certificates", "completion.pdf");

    pdf.create(html, {}).toFile(pdfPath, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Failed to generate PDF");
        }
        res.send("PDF generated successfully");
    });
};

// Function to fetch PDF
const fetchPdf = (req, res) => {
    const pdfPath = path.join(__dirname, "..", "DCertificate", "certificates", "completion.pdf");
    res.sendFile(pdfPath);
};

// Function to send PDF by email
const sendPdfByEmail = async (req, res) => {
    try {
        const { recipientEmail } = req.body;
        const pathToAttachment = path.join(__dirname, "..", "DCertificate", "certificates", "completion.pdf");
        console.log("Path to attachment:", pathToAttachment);

        // Check if the file exists before proceeding
        if (!fs.existsSync(pathToAttachment)) {
            console.error('File does not exist:', pathToAttachment);
            return res.status(500).send({ success: false, message: 'PDF file does not exist' });
        }

        const attachment = fs.readFileSync(pathToAttachment).toString("base64");
        
        const mail = await mailService.send({
            from: {
                email: 'bbalendrakumar@gmail.com',
                name: 'Banujan Balendrakumar',
            },
            to: {
                email: recipientEmail, // Use recipientEmail from request body
            },
            subject: 'Your Course Completion Certificate',
            body: '<h1>Congratulations!</h1><p>You have completed the course.</p>',
            text: 'Please find your certificate attached.',
            attachments: [{
                content: attachment,
                filename: 'completion.pdf',
                contentType: 'application/pdf',
                
            }],
        });

        console.log("Email sent successfully");

        res.send({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send({ success: false, message: 'Failed to send email', error: error.message });
    }
};

// Define routes
router.post("/generate/pdf", createPdf); // Endpoint to generate PDF
router.get("/fetch/pdf", fetchPdf);      // Endpoint to fetch PDF
router.post("/send/pdf", sendPdfByEmail); // Endpoint to send PDF by email

module.exports = router;

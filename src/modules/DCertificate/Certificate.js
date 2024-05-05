// certificate.js

const express = require('express');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

const router = express.Router();

// Generate a digital certificate PDF
const generateCertificate = (recipientName, courseName, completionDate) => {
  const doc = new PDFDocument();

  doc.fontSize(20).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`This certificate is awarded to ${recipientName} for completing the course: ${courseName}.`);
  doc.moveDown();
  doc.fontSize(12).text(`Date of Completion: ${completionDate}`);
  doc.moveDown();
  doc.fontSize(10).text(`Issued by: CoBit05`);

  const filePath = `./certificates/${recipientName}_${courseName}_Certificate.pdf`;
  doc.pipe(fs.createWriteStream(filePath));
  doc.end();

  return filePath;
};

// Email the generated certificate to the recipient
const sendCertificateByEmail = async (recipientEmail, certificateFilePath) => {
  try {
    const transporter = nodemailer.createTransport({
      // Configure your email service provider settings here
    });

    const mailOptions = {
      from: 'aranya24arii@gmail.com',
      to: recipientEmail,
      subject: 'Digital Certificate',
      text: 'Congratulations! You have successfully completed the course.',
      attachments: [{
        filename: 'Certificate.pdf',
        path: certificateFilePath,
        contentType: 'application/pdf',
      }],
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email', errorMessage: error.message };
  }
};

// Route to generate and send a digital certificate
router.post('/generate', async (req, res) => {
  const { recipientName, courseName, completionDate, issuerName, recipientEmail } = req.body;

  try {
    // Generate the certificate PDF
    const certificateFilePath = generateCertificate(recipientName, courseName, completionDate, issuerName);

    // Send the certificate via email
    const emailSent = await sendCertificateByEmail(recipientEmail, certificateFilePath);

    if (emailSent) {
      res.status(200).json({ message: 'Certificate generated and sent successfully.' });
    } else {
      res.status(500).json({ error: 'Failed to send certificate via email.' });
    }
  } catch (error) {
    console.error('Error generating and sending certificate:', error);
    res.status(500).json({ error: 'Internal server error.', errorMessage: error.message });
  }
});

module.exports = router;

const express = require('express');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const mongoose = require('mongoose');
const router = express.Router();
const mailService = require('./../../services/email-service');

// MongoDB Schema and Model definition
const certificateSchema = new mongoose.Schema({
  recipientName: String,
  courseName: String,
  completionDate: Date,
  issuerName: String,
  recipientEmail: String,
  certificateFilePath: String,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

// Ensure the certificates directory exists
const certificatesDir = path.join(__dirname, 'certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

// Generate a digital certificate PDF
const generateCertificate = (recipientName, courseName, completionDate, issuerName) => {
  const doc = new PDFDocument();
  const filePath = path.join(certificatesDir, `${recipientName}_${courseName}_Certificate.pdf`);

  doc.fontSize(20).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`This certificate is awarded to ${recipientName} for completing the course: ${courseName}.`);
  doc.moveDown();
  doc.fontSize(12).text(`Date of Completion: ${completionDate}`);
  doc.moveDown();
  doc.fontSize(10).text(`Issued by: ${issuerName}`);

  doc.pipe(fs.createWriteStream(filePath));
  doc.end();

  return filePath;
};

// Email the generated certificate to the recipient
const sendCertificateByEmail = async (recipientEmail, certificateFilePath) => {
  try {
    const mail = await mailService.send({
      from: {
        email: 'bbalendrakumar@gmail.com',
        name: 'Banujan Balendrakumar',
      },
      to: {
        email: recipientEmail,
        name: 'Recipient Name', // Replace with actual recipient name if available
      },
      subject: 'Your Course Completion Certificate',
      text: 'Please find your certificate attached.',
      attachments: [{
        filename: 'Certificate.pdf',
        path: certificateFilePath,
        contentType: 'application/pdf',
      }],
    });

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

    // Save certificate details to MongoDB
    const certificate = new Certificate({
      recipientName,
      courseName,
      completionDate,
      issuerName,
      recipientEmail,
      certificateFilePath,
    });
    await certificate.save();

    // Send the certificate via email
    const emailSent = await sendCertificateByEmail(recipientEmail, certificateFilePath);

    if (emailSent.success) {
      res.status(200).json({ message: 'Certificate generated and sent successfully.' });
    } else {
      res.status(500).json({ error: 'Failed to send certificate via email.', details: emailSent.message });
    }
  } catch (error) {
    console.error('Error generating and sending certificate:', error);
    res.status(500).json({ error: 'Internal server error.', errorMessage: error.message });
  }
});

module.exports = router;

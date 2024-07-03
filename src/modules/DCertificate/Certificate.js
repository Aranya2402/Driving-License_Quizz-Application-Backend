// const express = require('express');
// const fs = require('fs');
// const path = require('path');
// //const PDFDocument = require('pdfkit');
// const mongoose = require('mongoose');
// const router = express.Router();
// const mailService = require('../../services/email-service');
// const User = require('../../models/User');

// const pdf = require('html-pdf')
// const certificateTemplate = require("./certificates/CertificateTemplate");
// const { content } = require('pdfkit/js/page');


// const certificateSchema = new mongoose.Schema({
//   recipientName: String,
//   courseName: String,
//   completionDate: Date,
  
//   recipientEmail: String,
//   certificateFilePath: String,
//   pdf:String,
// });

// const Certificate = mongoose.model('Certificate', certificateSchema);


// const certificatesDir = path.join(__dirname, 'certificates');
// if (!fs.existsSync(certificatesDir)) {
//   fs.mkdirSync(certificatesDir, { recursive: true });
// }

// // Generate a digital certificate PDF
// const generateCertificate = (recipientName, courseName, completionDate, issuerName) => {
//   const doc = new PDFDocument();
//   const filePath = path.join(certificatesDir, `${recipientName}_${courseName}_Certificate.pdf`);

//   doc.fontSize(20).text('Certificate of Achievement', { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(14).text(`This is to certify that`);
//   doc.moveDown();
//   doc.fontSize(20).text(`${recipientName}`, { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(14).text(`has successfully completed`);
//   doc.moveDown();
//   doc.fontSize(20).text(`${courseName}`, { align: 'center' });
//   doc.moveDown();
//   doc.fontSize(14).text(`on ${completionDate}`, { align: 'center' });
//   doc.moveDown();

//   // Footer section
//   doc.moveDown();
//   doc.fontSize(14).text('Date', { align: 'left' });
//   doc.fontSize(14).text(`${completionDate}`, { align: 'left' });
//   doc.moveDown();
//   doc.fontSize(14).text('Signature', { align: 'right' });

  


//   doc.pipe(fs.createWriteStream(filePath));
//   doc.end();

//   return filePath;
// };

// // Email the generated certificate to the recipient
// const sendCertificateByEmail = async (recipientEmail, certificateFilePath) => {
//   try {
//     const mail = await mailService.send({
//       from: {
//         email: 'bbalendrakumar@gmail.com',
//         name: 'Banujan Balendrakumar',
//       },
//       to: {
//         email: 'aranya24arii@gmail.com',
        
//       },
//       subject: 'Your Course Completion Certificate',
//       body: '<h1>Congratulations!</h1><p>You have completed the course.</p>', // HTML content
//       text: 'Please find your certificate attached.',
//       attachments: [{
//         filename: 'Certificate.pdf',
//         path: certificateFilePath,
//         contentType: 'application/pdf',
//       }],
//     });

//     return { success: true, message: 'Email sent successfully' };
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return { success: false, message: 'Failed to send email', errorMessage: error.message };
//   }
// };

// // Route to generate and send a digital certificate
// // router.post('/generate', async (req, res) => {
// //   const { recipientName, courseName, completionDate,  recipientEmail } = req.body;

// //   try {
// //     // Generate the certificate PDF
// //     const certificateFilePath = generateCertificate(recipientName, courseName, completionDate);

// //     // Save certificate details to MongoDB
// //     const certificate = new Certificate({
// //       recipientName,
// //       courseName,
// //       completionDate,
      
// //       recipientEmail,
// //       certificateFilePath,
// //     });
// //     await certificate.save();

// //     res.status(200).json({ message: 'Certificate generated successfully.', certificateFilePath });
// //   } catch (error) {
// //     console.error('Error generating certificate:', error);
// //     res.status(500).json({ error: 'Internal server error.', errorMessage: error.message });
// //   }
// // });

// const createdPdf = (req,res)=>{
//   pdf.create(certificateTemplate(req.body),{}).toFile("completion.pdf",(err)=>{
//     if(err){
//       console.log(err)
//     }
//     res.send("pdf generated")
//   })
// }
// const fetchPdf = (req,res)=>{
//   res.sendFile(path.join(path.dirname(__dirname),"completion.pdf"))
// }
// const sendPdf = (req,res)=>{
//   pathToAttachment = path.join(path.dirname(__dirname),"completion.pdf")
//   attachment = fs.readFileSync(pathToAttachment).toString("base64")
//   const sendCertificateByEmail = async (recipientEmail, certificateFilePath) => {
//     try {
//       const mail = await mailService.send({
//         from: {
//           email: 'bbalendrakumar@gmail.com',
//           name: 'Banujan Balendrakumar',
//         },
//         to: {
//           email: 'aranya24arii@gmail.com',
          
//         },
//         subject: 'Your Course Completion Certificate',
//         body: '<h1>Congratulations!</h1><p>You have completed the course.</p>', // HTML content
//         text: 'Please find your certificate attached.',
//         attachments: [{
//           content:attachment,
//           filename: 'completion.pdf',
//           contentType: 'application/pdf',
//         }],
//       });
  
//       return { success: true, message: 'Email sent successfully' };
//     } catch (error) {
//       console.error('Error sending email:', error);
//       return { success: false, message: 'Failed to send email', errorMessage: error.message };
//     }
//   };
// }
// router.post("/generate/pdf",createdPdf)
// router.get("/generate/pdf",fetchPdf)
// router.post("/generate/sendmail",sendPdf)

// // Route to send certificate by email
// router.post('/send-email', async (req, res) => {
//   const { recipientName, recipientEmail, certificateFilePath } = req.body;

//   try {
//     const emailSent = await sendCertificateByEmail(recipientName, recipientEmail, certificateFilePath);

//     if (emailSent.success) {
//       res.status(200).json({ message: 'Certificate sent via email successfully.' });
//     } else {
//       res.status(500).json({ error: 'Failed to send certificate via email.', details: emailSent.message });
//     }
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ error: 'Internal server error.', errorMessage: error.message });
//   }
// });

// module.exports = router;

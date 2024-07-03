module.exports = function certificateTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Certificate</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
            }
            .certificate-container {
              border: 10px solid #7976D9;
              padding: 20px;
              border-radius: 15px;
            }
            .certificate-title {
              font-size: 50px;
              color: #7976D9;
            }
            .certificate-body {
              font-size: 20px;
            }
            .certificate-footer {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 10px 20px;
              background-color: #f0f2f7;
              color: #323A6E;
            }
            .left-section,
            .center-section,
            .right-section {
              flex: 1;
              text-align: center;
              margin-right: 10px; /* Add margin-right */
              margin-left: 10px;  /* Add margin-left */
            }
            .left-section img,
            .center-section img,
            .right-section img {
              max-width: 100%;
              height: auto;
            }
            .signature p,
            .date p {
              margin: 5px 0;
            }
            .Bar {
              background: #323A6E;
              color: #f0f2f7;
              padding: 10px;
              border-radius: 0 0 10px 10px;
              text-align: center;
            }
            .Bar p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <h1 class="certificate-title">Certificate of Achievement</h1>
            <p class="certificate-body">This is to certify that</p>
            <h2>${data.recipientName}</h2>
            <p class="certificate-body">has successfully completed the</p>
            <h2>${data.courseName}</h2>
            <p class="certificate-body">course on</p>
            <h3>${data.completionDate}</h3>
  
            <div class="certificate-footer">
              <div class="left-section">
                <div class="seal">
                  <img src="http://localhost:3001/images/seal.png" alt="Seal" style="max-width: 20%; height: auto;">
                </div>
              </div>
              <div class="center-section">
                <div class="date">
                  <p>Date</p>
                  <p>${data.completionDate}</p>
                </div>
              </div>
              <div class="right-section">
                <div class="signature">
                  <p>Signature</p>
                  <img src="http://localhost:3001/images/signature.png" alt="Signature" style="max-width: 20%; height: auto;">
                </div>
              </div>
            </div>
  
            <div class="Bar">
              <p>CoBit 05</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };
  
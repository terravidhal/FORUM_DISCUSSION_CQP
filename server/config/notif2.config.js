const nodemailer = require('nodemailer');
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service :'gmail',  
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_ADMIN_ACADEMY,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendCertificateNotification(studentInfo, certificatePath) {
  try {
    const info = await transporter.sendMail({
      from: { name: 'CERTIFIA Team', address: process.env.EMAIL_ADMIN_ACADEMY },
      to: studentInfo.email,
      subject: "Your Certificate is Ready!",
      text: `Hi ${studentInfo.name}, your certificate is now available for download.`,
      html: `
        Hi ${studentInfo.name}, <br>
        We're pleased to inform you that your certificate is now ready!
        Sincerely, <br>
        The CERTIFIA Team
      `,
      attachments: [
        {
         filename: `${studentInfo.name}_certificate.pdf`, 
         path : certificatePath,
         contentType: 'application/pdf',
        },
      ],
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

module.exports = sendCertificateNotification;

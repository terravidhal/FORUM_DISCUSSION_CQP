const nodemailer = require('nodemailer');


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

async function sendNewInstructorNotifications(studentInfo, studentEmail) {
  try {
    const info = await transporter.sendMail({
      from: { name: 'vidhal', address: process.env.EMAIL_ADMIN_ACADEMY },
      to: studentEmail,
      subject: "New Instructor Registered ✔",
      text: `A new instructor has registered with the name : ${studentInfo.name} and email : ${studentInfo.email}`,
      html: `A new <b>instructor</b> has registered with the <b>name</b> : &nbsp;<b>${studentInfo.name}</b> and <b>email</b> :  &nbsp;<b>${studentInfo.email}</b>. Please remember to grant them <b>access</b> after verification. Sincerely, The <b>Marsile-Vidhal Team</b>`, // Consider a more informative HTML body
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

async function sendDirectorEmail(paymentInfo) {
  try {
    const info = await transporter.sendMail({
      from: { name: 'vidhal', address: process.env.EMAIL_ADMIN_ACADEMY },
      to: "vidhalelame@gmail.com",
      subject: "Payment deleted ✔",
      text: `A recently payment has deleted with the name : ${paymentInfo.paymentName} and amount : ${paymentInfo.amount}, date : ${paymentInfo.paymentDate}`,
      html: `A recently <b>payment</b> has deleted with the <b>name</b> : &nbsp;<b>${paymentInfo.paymentName}</b> and <b>amount</b> :  &nbsp;<b>${paymentInfo.amount}</b> , <b>date</b> :  &nbsp;<b>${paymentInfo.paymentDate}</b>. Sincerely, The <b>Certifia Team</b>`, 
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}



module.exports = {
    sendNewInstructorNotifications,sendDirectorEmail,
}; 
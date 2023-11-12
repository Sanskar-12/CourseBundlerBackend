import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    to,
    subject,
    text,
    from: "sanskarv2004@gmail.com",
  });
};


export default sendEmail
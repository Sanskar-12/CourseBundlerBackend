import { createTransport } from "nodemailer";

const sendEmail = async (to, subject, text) => {
  const transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
      user: "d0262418afb1f6",
      pass: "f734590cf4d3f2"
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
import * as nodemailer from "nodemailer";

class Mail {
  sendMailToAdmin(text: string, subject: string) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "portaltotalclean@gmail.com",
        pass: "Mm884741"
      },
      tls: { rejectUnauthorized: false }
    });

    run();

    async function run() {
      console.log(transporter);
      const mailSent = await transporter.sendMail({
        text: text,
        subject: subject,
        from: "portaltotalclean@gmail.com",
        to: "matheuslf44@gmail.com",
      });
    }
  }

  sendMail(text: string, subject: string, to: string) {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "portaltotalclean@gmail.com",
        pass: "Mm884741"
      },
      tls: { rejectUnauthorized: false }
    });

    run();

    async function run() {
      console.log('run');
      const mailSent = await transporter.sendMail({
        text: text,
        subject: subject,
        from: "portaltotalclean@gmail.com",
        to: to,
      });
    }
  }

}

export default new Mail;

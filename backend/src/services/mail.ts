import * as nodemailer from "nodemailer";
import config from '../configs/configs';

class Mail {


    sendMail(text: string, subject: string) {

        const transporter = nodemailer.createTransport({
            host: config.host,
            auth: {
                user: config.user,
                pass: config.password
            },
            tls: { rejectUnauthorized: false }
        });

        run();

        async function run() {
            const mailSent = await transporter.sendMail({
                text: text,
                subject: subject,
                from: "portaltotalclean@gmail.com",
                to: "matheuslf44@gmail.com",
            });
            console.log(run);
        }
    }

}

export default new Mail;
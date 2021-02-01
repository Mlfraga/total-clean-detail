"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var nodemailer = _interopRequireWildcard(require("nodemailer"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Mail {
  sendMailToAdmin(text, subject) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "portaltotalclean@gmail.com",
        pass: "Mm884741"
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    run();

    async function run() {
      console.log(transporter);
      const mailSent = await transporter.sendMail({
        text: text,
        subject: subject,
        from: "portaltotalclean@gmail.com",
        to: "matheuslf44@gmail.com"
      });
    }
  }

  sendMail(text, subject, to) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "portaltotalclean@gmail.com",
        pass: "Mm884741"
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    run();

    async function run() {
      console.log('run');
      const mailSent = await transporter.sendMail({
        text: text,
        subject: subject,
        from: "portaltotalclean@gmail.com",
        to: to
      });
    }
  }

}

var _default = new Mail();

exports.default = _default;
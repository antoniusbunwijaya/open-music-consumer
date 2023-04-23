const nodemailer = require("nodemailer");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendMail(targetEmail, content) {
    const message = {
      from: "Open Musics API",
      to: targetEmail,
      subject: "Exports Playlists By Id",
      text: "Result from exports Playlists",
      attachments: [
        {
          filename: "playlists.json",
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;

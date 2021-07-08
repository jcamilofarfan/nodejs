import nodemailer from "nodemailer";
import config from "../config";

const mail = config.EMAIL

const transporter= nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth:{
        user: mail.user,
        pass: mail.pass
    },
    tls:{
        rejectUnauthorized: false
    }
})
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready Server Email");
    }
})
const sendEmail = async (email, subject, html)=>{
    try {
        await transporter.sendMail({
            from: `SisContables <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola amigos, suscríbance para más videos", // plain text body
            html, // html body
        });
    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
}

const getTemplate = (name, token) => {
    return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="http://localhost:4000/api/auth/verify/${token}"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
    `;
};

module.exports = {
    sendEmail,
    getTemplate
}
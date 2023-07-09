import nodeMailer from "nodemailer";

const mailingService = async (receptor: string, code: string) => {
    const subject = "Codigo de verificacion para creacion de cuenta";
    const title = "Registrar Cuenta de AlaCarta";
    const text = `Usted fue agregado como staff a un restaurant en 
    <a href="${process.env.FRONTEND_URL}">AlaCarta</a>. Para registrar su cuenta 
    llene los datos y use el siguiente codigo:`;
    const html = `
    <h1><a href="${process.env.FRONTEND_URL}">${title}</a></h1>
    <p>${text}</p>
    <h2>${code}</h2>
    `;

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, // 465 for secure or 587 for not secure
        secure: true,
        auth: {
            user: process.env.MAIL,
            pass: process.env.PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.MAIL,
        to: receptor,
        subject,
        html,
    });

    console.log(
        `Emails sent: ${info.accepted}\nEmails not sent: ${info.rejected}`
    );
};

export { mailingService };

const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.net",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER, // Sender gmail address
        pass: process.env.EMAIL_PASSWORD, // Password from Gmail of the User
    },
});

const getUsersEmails = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true,
            },
        });
        return users.map((user) => user.email);
    } catch (error) {
        console.error("Error fetching user emails:", error);
        throw error;
    }
};

const sendMail = async (transporter, toEmails, messageInfo) => {
    try {
        // Set the 'to' field dynamically with the array of emails
        messageInfo.to = toEmails;
        await transporter.sendMail(messageInfo);
        console.log("Email has been sent!");
    } catch (error) {
        console.log(error);
    }
};

const main = async () => {
    try {
        const toEmails = await getUsersEmails();
        const messageInfo = {
            from: {
                name: "Guidance and Counseling Office",
                address: "no-reply@example.com",
            },
            subject: "Sending Email with Nodemailer",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
            priority: "low",
            attachment: [
                {
                    filename: "career.png",
                    path: "../public/img/career.png",
                    contentTpe: "application/png",
                },
            ],
        };

        await sendMail(transporter, toEmails, messageInfo);
    } catch (error) {
        console.error("Error sending email:", error);
    } finally {
        await prisma.$disconnect();
    }
};

main();

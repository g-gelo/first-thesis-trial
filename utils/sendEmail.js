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

export default async function (subject, text) {
    return await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: await getUsersEmails(),
        subject,
        text,
    });
}

declare module "nodemailer" {
    interface SendMailOptions {
        from?: string;
        to?: (string | null)[] | undefined;
        subject?: string;
        text?: string;
    }

    interface Transporter {
        sendMail(mailOptions: SendMailOptions): Promise<any>;
    }

    function createTransport(options: any): Transporter;

    export { createTransport };
}

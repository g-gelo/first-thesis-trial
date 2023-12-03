import sendEmail from "../../utils/sendEmail";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let career = null;

    if (
        body.title &&
        body.description &&
        body.date &&
        body.time &&
        body.location
    ) {
        career = await event.context.prisma.career.create({
            data: {
                title: body.title,
                description: body.description,
                date: body.date,
                time: body.time,
                location: body.location,
            },
        });
        const emailSubject = "New Job Vacancy Announcement";
        const emailText = `A new job vacancy is available: ${body.title}\nDetails: ${body.description}\nDate: ${body.date}\nTime: ${body.time}\nLocation: ${body.location}`;

        // await sendEmail(emailSubject, emailText);
    }
    return {
        career,
    };
});

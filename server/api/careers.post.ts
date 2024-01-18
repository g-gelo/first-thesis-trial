export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let career = null;

    if (body.title && body.description && body.date && body.location) {
      career = await event.context.prisma.career.create({
        data: {
          title: body.title,
          description: body.description,
          date: body.date,
          location: body.location,
        },
      });

      // Sending email notification
      const userEmails = await event.context.prisma.user.findMany({
        select: {
          email: true,
        },
      });

      await event.context.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmails.map((user) => user.email),
        subject: "New Career Event Created",
        text: `Dear Students,

                    A new career event has been created. Here are the details:
                    - Title: ${body.title}
                    - Description: ${body.description}
                    - Date: ${body.date}
                    - Location: ${body.location}

                    Stay updated for more information, See it in the Guidance Connect Application.


            Best regards,
            Career Services Office`,
      });
    }

    return {
      career,
    };
  } catch (error) {
    console.error("Error creating career event:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the career event.",
    };
  }
});

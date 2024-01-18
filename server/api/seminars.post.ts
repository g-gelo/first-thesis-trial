export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let seminar;

    if (body.title && body.guest_speaker && body.date && body.location) {
      seminar = await event.context.prisma.seminar.create({
        data: {
          title: body.title,
          guest_speaker: body.guest_speaker,
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
        subject: "New Seminar Created",
        text: `Dear Students,

                A new seminar has been scheduled. Here are the details:
                - Title: ${body.title}
                - Guest Speaker: ${body.guest_speaker}
                - Date: ${body.date}
                - Location: ${body.location}

                Stay tuned for more information.

            Best regards,
            Guidance and Counseling Office`,
      });
    }

    return {
      seminar,
    };
  } catch (error) {
    console.error("Error creating seminar:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the seminar.",
    };
  }
});

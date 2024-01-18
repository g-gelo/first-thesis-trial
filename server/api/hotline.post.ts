export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let hotline = null;

    if (body.organization && body.number && body.location) {
      hotline = await event.context.prisma.emegergencyHotline.create({
        data: {
          organization: body.organization,
          number: body.number,
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
        subject: "New Emergency Hotline Created",
        text: `Dear Students,

                A new emergency hotline has been added. Here are the details:
                - Organization: ${body.organization}
                - Number: ${body.number}
                - Location: ${body.location}

                Stay safe and informed.

            Best regards,
            Guidance and Counseling Office`,
      });
    }

    return {
      hotline,
    };
  } catch (error) {
    console.error("Error creating emergency hotline:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the emergency hotline.",
    };
  }
});

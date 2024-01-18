export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let gco = null;

    if (body.description) {
      await event.context.prisma.gCOProfile
        .create({
          data: {
            title: body.title,
            description: body.description,
          },
        })
        .then((response) => {
          gco = response;
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
        subject: "New GCO Profile Created",
        text: `Dear Students,

A new GCO profile has been created. Here are the details:
- Title: ${body.title}
- Description: ${body.description}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return {
      gco,
    };
  } catch (error) {
    console.error("Error creating GCO profile:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the GCO profile.",
    };
  }
});

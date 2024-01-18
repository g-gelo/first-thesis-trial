export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let gcoService = null;

    if (body.service) {
      await event.context.prisma.gCOServices
        .create({
          data: {
            service: body.service,
          },
        })
        .then((response) => {
          gcoService = response;
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
        subject: "New GCO Service Created",
        text: `Dear Students,

A new GCO service has been created. Here are the details:
- Service: ${body.service}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return {
      gcoService,
    };
  } catch (error) {
    console.error("Error creating GCO service:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the GCO service.",
    };
  }
});

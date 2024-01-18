export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let osas = null;
    const name = body.name;

    if (body.description) {
      await event.context.prisma.oSASProfile
        .create({
          data: {
            title: body.title,
            description: body.description,
          },
        })
        .then((response) => {
          osas = response;
        });

      // Sending email notification
      const userEmail = await event.context.prisma.user.findMany({
        select: {
          email: true,
        },
      });

      await event.context.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail.map((user) => user.email),
        subject: "New OSAS Profile Created",
        text: `Dear Students,

A new OSAS profile has been created by ${name}. Here are the details:
- Title: ${body.title}
- Description: ${body.description}

Keep using our Application to keep updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return {
      osas,
    };
  } catch (error) {
    console.error("Error creating OSAS profile:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while creating the OSAS profile.",
    };
  }
});

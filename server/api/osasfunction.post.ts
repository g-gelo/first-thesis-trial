export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let osasFunction = null;

    if (body.osasFunction) {
      osasFunction = await event.context.prisma.oSASFunctions.create({
        data: {
          osasFunction: body.osasFunction,
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
        subject: "New OSAS Function Added",
        text: `Dear Students,

A new OSAS function has been added: ${body.osasFunction}.

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return {
      osasFunction,
    };
  } catch (error) {
    console.error("Error creating OSAS function:", error);
    return {
      error: "An error occurred while creating the OSAS function.",
    };
  }
});

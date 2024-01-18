export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const osasFunction = body.osasFunction;
    const isArchive = body.isArchive;
    const userName = body.name;

    let updatedOsasFunction;

    if (id && osasFunction) {
      updatedOsasFunction = await event.context.prisma.oSASFunctions.update({
        where: {
          id,
        },
        data: {
          osasFunction,
          isArchive,
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
        subject: "OSAS Function Updated",
        text: `Dear Students,

OSAS function has been updated by ${userName}. Here are the details:
- OSAS Function: ${osasFunction}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return updatedOsasFunction;
  } catch (error) {
    console.error("Error updating OSAS function:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the OSAS function.",
    };
  }
});

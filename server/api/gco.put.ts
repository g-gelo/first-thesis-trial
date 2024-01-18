export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const description = body.description;
    const isArchive = body.isArchive;

    let updatedGco;

    if (id && description) {
      updatedGco = await event.context.prisma.gCOProfile.update({
        where: {
          id,
        },
        data: {
          title,
          description,
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
        subject: "GCO Profile Updated",
        text: `Dear Students,

The GCO profile has been updated. Here are the details:
- Title: ${title}
- Description: ${description}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return updatedGco;
  } catch (error) {
    console.error("Error updating GCO profile:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the GCO profile.",
    };
  }
});

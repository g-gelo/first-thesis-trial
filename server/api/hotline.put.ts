export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const organization = body.organization;
    const number = body.number;
    const location = body.location;
    const isArchive = body.isArchive;

    let updatedEmergencyHotline;

    if (id && organization && number && location) {
      updatedEmergencyHotline =
        await event.context.prisma.emegergencyHotline.update({
          where: {
            id,
          },
          data: {
            organization,
            number,
            location,
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
        subject: "Emergency Hotline Updated",
        text: `Dear Students,

              The emergency hotline details have been updated. Here are the new details:
              - Organization: ${organization}
              - Number: ${number}
              - Location: ${location}

              Stay informed.

          Best regards,
          Guidance and Counseling Office`,
      });
    }

    return updatedEmergencyHotline;
  } catch (error) {
    console.error("Error updating emergency hotline:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the emergency hotline.",
    };
  }
});

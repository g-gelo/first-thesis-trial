export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const guest_speaker = body.guest_speaker;
    const date = body.date;
    const location = body.location;
    const isArchive = body.isArchive;

    let updatedSeminar;

    if (id && title && guest_speaker && date && location) {
      updatedSeminar = await event.context.prisma.seminar.update({
        where: {
          id,
        },
        data: {
          title,
          guest_speaker,
          date,
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
        subject: "Seminar Updated",
        text: `Dear Students,

              The details of the seminar have been updated. Here are the revised details:
              - Title: ${title}
              - Guest Speaker: ${guest_speaker}
              - Date: ${date}
              - Location: ${location}

              Stay updated for any changes.

          Best regards,
          Guidance and Counseling Office`,
      });
    }

    return updatedSeminar;
  } catch (error) {
    console.error("Error updating seminar:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the seminar.",
    };
  }
});

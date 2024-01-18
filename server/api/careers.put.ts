export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const description = body.description;
    const location = body.location;
    const date = body.date;
    const isArchive = body.isArchive;

    let updatedCareer;

    if (id && title && description && location && date)
      updatedCareer = await event.context.prisma.career.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          location,
          date,
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
      subject: "Career Event Updated",
      text: `Dear Students,

              The details of a career event have been updated. Here are the new details:
              - Title: ${title}
              - Description: ${description}
              - Location: ${location}
              - Date: ${date}

              Stay updated for more information, See it in the Guidance Connect Application.

        Best regards,
        Career Services Office`,
    });

    return updatedCareer;
  } catch (error) {
    console.error("Error updating career event:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the career event.",
    };
  }
});

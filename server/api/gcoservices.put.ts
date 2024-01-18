export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const service = body.service;
    const isArchive = body.isArchive;

    let updatedGcoService;

    if (id && service) {
      updatedGcoService = await event.context.prisma.gCOServices.update({
        where: {
          id,
        },
        data: {
          service,
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
        subject: "GCO Service Updated",
        text: `Dear Students,

A GCO service has been updated. Here are the details:
- Service: ${service}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return updatedGcoService;
  } catch (error) {
    console.error("Error updating GCO service:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the GCO service.",
    };
  }
});

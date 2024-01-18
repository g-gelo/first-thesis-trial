import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const description = body.description;
    const isArchive = body.isArchive;
    const userName = body.name;

    let updatedOsas;

    if (id && description) {
      updatedOsas = await prisma.oSASProfile.update({
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
        subject: "Updated OSAS Profile",
        text: `Dear Students,

The OSAS profile has been updated by ${userName}. Here are the details:
- Title: ${title}
- Description: ${description}

Keep using our Application to stay updated.

Best regards,
Guidance and Counseling Office`,
      });
    }

    return updatedOsas;
  } catch (error) {
    console.error("Error updating OSAS profile:", error);
    // Handle error, show a notification, etc.
    return {
      error: "An error occurred while updating the OSAS profile.",
    };
  }
});

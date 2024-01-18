import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const title = body.title;
  const description = body.description;
  const userName = body.name;

  let updatedMisnVis;

  if (id && title && description) {
    try {
      updatedMisnVis = await prisma.universityMissionVision.update({
        where: {
          id,
        },
        data: {
          title,
          description,
        },
      });

      const userEmail = await event.context.prisma.user.findMany({
        select: {
          email: true,
        },
      });

      await event.context.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail.map((user) => user.email),
        subject: "University Mission and Vision Updated",
        text: `Dear Students,

The University Mission and Vision have been updated by ${userName}. Here are the details:
- Title: ${title}
- Description: ${description}

Thank you for keeping the information up to date.

Best regards,
Guidance and Counseling Office`,
      });
    } catch (error) {
      console.error("Error updating mission and vision:", error);
    }
  }

  return updatedMisnVis;
});

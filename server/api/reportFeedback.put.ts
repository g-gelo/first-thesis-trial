import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const feedback = body.feedback;

  let updatedStatus;

  if (id && feedback) {
    updatedStatus = await prisma.report.update({
      where: {
        id,
      },
      data: {
        feedback,
      },
    });
  }

  return updatedStatus;
});

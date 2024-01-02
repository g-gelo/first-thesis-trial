import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const newStatus = body.newStatus;

  let updatedStatus;

  if (id && newStatus) {
    updatedStatus = await prisma.report.update({
      where: {
        id,
      },
      data: {
        status: newStatus,
      },
    });
  }

  return updatedStatus;
});

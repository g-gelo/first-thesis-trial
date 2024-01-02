import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let updatedReport;

  try {
    const body = await readBody(event);
    const id = body.id;
    const isArchive = body.isArchive;

    if (id) {
      try {
        updatedReport = await prisma.report.update({
          where: {
            id,
          },
          data: {
            isArchive,
          },
        });
      } catch (error) {
        console.error("Error updating report:", error);
      }
    } else {
      console.error("Invalid input data");
    }
  } catch (error) {
    console.error("Error updating report:", error);
  } finally {
    await prisma.$disconnect();
  }

  return updatedReport;
});

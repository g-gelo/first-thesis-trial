import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let updatedReport;

  try {
    const body = await readBody(event);
    const id = body.id;
    const incident = body.incident;
    const description = body.description;
    const isArchive = body.isArchive;

    if (id && incident && description) {
      try {
        updatedReport = await prisma.report.update({
          where: {
            id,
          },
          data: {
            incident,
            description,
            feedback: "Thank you! Your report has been submitted successfully.",
            status: "Pending",
            isArchive,
          },
        });
      } catch (error) {
        console.error("Error updating appointment:", error);
      }
    } else {
      console.error("Invalid input data");
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
  } finally {
    await prisma.$disconnect();
  }

  return updatedReport;
});

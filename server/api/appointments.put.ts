import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let updatedAppointment;

  try {
    const body = await readBody(event);
    const id = body.id;
    const isArchive = body.isArchive;

    if (id) {
      try {
        updatedAppointment = await prisma.appointment.update({
          where: {
            id,
          },
          data: {
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

  return updatedAppointment;
});

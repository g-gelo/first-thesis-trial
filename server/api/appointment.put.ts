import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let updatedAppointment;

  try {
    const body = await readBody(event);
    const id = body.id;
    const date = body.date;
    const time = body.time;
    const reason = body.reason;
    const course = body.course;
    const year = body.year;
    const isArchive = body.isArchive;

    if (id && date && time && reason && course && year) {
      try {
        updatedAppointment = await prisma.appointment.update({
          where: {
            id,
          },
          data: {
            date,
            time,
            reason,
            course,
            year,
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

  return updatedAppointment;
});

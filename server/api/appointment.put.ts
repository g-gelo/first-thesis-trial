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
    const userName = body.name;
    const userEmail = body.email;

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

        console.log("Before sending email");
        console.log("Email user:", process.env.EMAIL_USER);

        try {
          await event.context.transport.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Appointment Confirmation: You made a Reschedule!",
            text: `Dear ${userName},

                    This is to confirm that you have successfully made a Reschedule for the following details:
                    - Date: ${date}
                    - Time: ${time}

                    Thank you for scheduling your appointment. If you have any questions or need to make changes, please feel free to contact us.

                    Best regards,
                    Guidance and Counseling Office`,
          });

          console.log("After sending email");
        } catch (error) {
          console.error("Error sending email:", error);
        }
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

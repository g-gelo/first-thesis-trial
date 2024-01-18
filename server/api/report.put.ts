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
    const userName = body.name;
    const userEmail = body.email;

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
        console.log("Before sending email");
        console.log("Email user:", process.env.EMAIL_USER);

        try {
          await event.context.transport.sendMail({
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "Incident Report Edit Confirmation",
            text: `Dear ${userName},

              This is to confirm that you have successfully edited your incident report with the following details:
              - Incident: ${incident}
              - Description: ${description}
              - Status: Pending

              Thank you for updating your incident report. If you have any additional information or concerns, please feel free to contact us.

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

  return updatedReport;
});

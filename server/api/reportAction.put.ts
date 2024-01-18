import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const newStatus = body.newStatus;
  const incident = body.incident;
  const description = body.description;
  const userName = body.name;
  const userEmail = body.email;

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

    console.log("Before sending email");
    console.log("Email user:", process.env.EMAIL_USER);

    try {
      let emailSubject, emailText;

      // Customize email content based on the new status
      switch (newStatus) {
        case "Accepted":
          emailSubject =
            "Incident Report Accepted: Your report has been accepted";
          emailText = `Dear ${userName},

We are pleased to inform you that your incident report has been accepted. Here are the details:
- Incident: ${incident}
- Description: ${description}
- Status: ${newStatus}

Thank you for reporting the incident. If you have any questions or concerns, please feel free to contact us.

Best regards,
Guidance and Counseling Office`;
          break;

        case "Rejected":
          emailSubject =
            "Incident Report Rejected: Your report has been rejected";
          emailText = `Dear ${userName},

We regret to inform you that your incident report has been rejected. If you have any questions or concerns, please feel free to contact us.

Best regards,
Guidance and Counseling Office`;
          break;

        case "Resolved":
          emailSubject =
            "Incident Report Resolved: Your report has been successfully resolved";
          emailText = `Dear ${userName},

We are pleased to inform you that your incident report has been successfully resolved. If you have any further questions or need additional assistance, please feel free to contact us.

Best regards,
Guidance and Counseling Office`;
          break;

        default:
          // Handle other status values or provide a default message
          emailSubject =
            "Incident Report Status Updated: Your report status has been updated";
          emailText = `Dear ${userName},

Your incident report status has been updated to: ${newStatus}. If you have any questions or concerns, please feel free to contact us.

Best regards,
Guidance and Counseling Office`;
          break;
      }

      // Send the email
      await event.context.transport.sendMail({
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: emailSubject,
        text: emailText,
      });

      console.log("After sending email");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }

  return updatedStatus;
});

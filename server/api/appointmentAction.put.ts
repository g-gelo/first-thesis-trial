import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const newStatus = body.newStatus;
  const date = body.date;
  const time = body.time;
  const reason = body.reason;
  const course = body.course;
  const year = body.year;
  const userName = body.name;
  const userEmail = body.email;

  let updatedStatus;

  if (id && newStatus) {
    updatedStatus = await prisma.appointment.update({
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
            "Appointment Accepted: Your counseling appointment has been accepted";
          emailText = `Dear ${userName},

          We are pleased to inform you that your counseling appointment has been accepted. Here are the details:
          - Date: ${date}
          - Time: ${time}
          - Course: ${course}
          - Reason: ${reason}
          - Year: ${year}

          Thank you for scheduling your appointment. If you have any questions or need to make changes, please feel free to contact us.

          Best regards,
          Guidance and Counseling Office`;
          break;

        case "Rejected":
          emailSubject =
            "Appointment Rejected: Your counseling appointment has been rejected";
          emailText = `Dear ${userName},

          We regret to inform you that your counseling appointment has been rejected. If you have any questions or concerns, please feel free to contact us.

          Best regards,
          Guidance and Counseling Office`;
          break;

        case "Finished":
          emailSubject =
            "Appointment Completed: Your counseling appointment has been successfully completed";
          emailText = `Dear ${userName},

          We are pleased to inform you that your counseling appointment has been successfully completed. If you have any further questions or need additional assistance, please feel free to contact us.

          Best regards,
          Guidance and Counseling Office`;
          break;

        default:
          // Handle other status values or provide a default message
          emailSubject =
            "Appointment Status Updated: Your counseling appointment status has been updated";
          emailText = `Dear ${userName},

          Your counseling appointment status has been updated to: ${newStatus}. If you have any questions or concerns, please feel free to contact us.

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

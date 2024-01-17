export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if required properties are present in the request body
    if (
      body.date &&
      body.time &&
      body.reason &&
      body.course &&
      body.year &&
      body.email &&
      body.name &&
      body.userId
    ) {
      // create an appointment
      const appointment = await event.context.prisma.appointment.create({
        data: {
          date: body.date,
          time: body.time,
          reason: body.reason,
          course: body.course,
          year: body.year,
          userId: body.userId,
        },
      });

      console.log("Before sending email");
      console.log("Email user:", process.env.EMAIL_USER);

      try {
        await event.context.transport.sendMail({
          from: process.env.EMAIL_USER,
          to: body.email,
          subject: "Appointment Confirmation: You made an appointment!",
          text: `Dear ${body.name},

              This is to confirm that you have successfully made an appointment for the following details:
              - Date: ${body.date}
              - Time: ${body.time}
              - Reason: ${body.reason}
              - Course: ${body.course}
              - Year: ${body.year}

            Thank you for scheduling your appointment. If you have any questions or need to make changes, please feel free to contact us.

        Best regards,
          Guidance and Counseling Office`,
        });
        console.log("After sending email");

        // Rest of your code
        return {
          appointment,
        };
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
      }
    } else {
      // Return an error response if any required property is missing
      throw new Error("Missing required data in the request body.");
    }
  } catch (error) {
    // Log the error with a higher logging level
    console.error("Error creating appointment:", error);

    // Return a detailed error response for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
    };
  }
});

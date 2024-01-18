export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Check if required properties are present in the request body
    if (body.incident && body.description && body.userId) {
      // create a report
      const report = await event.context.prisma.report.create({
        data: {
          incident: body.incident,
          description: body.description,
          feedback: "Thank you! Your report has been submitted successfully.",
          isArchive: body.isArchive,
          userId: body.userId,
        },
      });

      console.log("Before sending email");
      console.log("Email user:", process.env.EMAIL_USER);

      try {
        await event.context.transport.sendMail({
          from: process.env.EMAIL_USER,
          to: body.email,
          subject: "Incident Report Submission Confirmation",
          text: `Dear ${body.name},

              This is to confirm that your incident report has been submitted successfully with the following details:
              - Incident: ${body.incident}
              - Description: ${body.description}
              - Status: Pending

              Thank you for reporting the incident. If you have any additional information or concerns, please feel free to contact us.

              Best regards,
              Guidance and Counseling Office`,
        });

        console.log("After sending email");

        // Return the created report
        return {
          report,
        };
      } catch (emailError) {
        // Log the error with sending the email
        console.error("Error sending email:", emailError);

        // You may choose to handle the email sending error differently if needed

        // Rethrow the error to trigger the outer catch block
        throw emailError;
      }
    } else {
      // Return an error response if any required property is missing
      throw new Error("Missing required data in the request body.");
    }
  } catch (error) {
    // Log the error with a higher logging level
    console.error("Error creating report:", error);

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

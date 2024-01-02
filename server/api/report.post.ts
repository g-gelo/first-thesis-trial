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
          status: body.status,
          isArchive: body.isArchive,
          userId: body.userId,
        },
      });

      // Return the created report
      return {
        report,
      };
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

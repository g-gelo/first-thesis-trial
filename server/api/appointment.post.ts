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

      // Return the created appointment
      return {
        appointment,
      };
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

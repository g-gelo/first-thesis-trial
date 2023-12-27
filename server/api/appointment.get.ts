export default defineEventHandler(async (event) => {
  const appointments = await event.context.prisma.appointment.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return appointments;
});

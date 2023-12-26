export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { prisma } = event.context;

  let appointment = null;

  if (body.id) {
    appointment = await prisma.appointment.delete({
      where: {
        id: body.id,
      },
    });
  }

  return appointment;
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { prisma } = event.context;

  let report = null;

  if (body.id) {
    report = await prisma.report.delete({
      where: {
        id: body.id,
      },
    });
  }

  return report;
});

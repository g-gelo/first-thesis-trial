export default defineEventHandler((event) => {
  return event.context.prisma.report.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
});

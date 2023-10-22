export default defineEventHandler((event) => {
    return event.context.prisma.gCOProfile.findMany();
});

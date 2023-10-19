export default defineEventHandler((event) => {
    return event.context.prisma.oSASFunctions.findMany();
});

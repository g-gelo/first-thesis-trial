export default defineEventHandler((event) => {
    return event.context.prisma.emegergencyHotline.findMany();
});

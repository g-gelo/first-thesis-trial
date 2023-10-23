export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let emergency = null;

    if (body.id) {
        emergency = await prisma.emegergencyHotline.delete({
            where: {
                id: body.id,
            },
        });
    }

    return emergency;
});

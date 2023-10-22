export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let gco = null;

    if (body.id) {
        gco = await prisma.gCOProfile.delete({
            where: {
                id: body.id,
            },
        });
    }

    return gco;
});

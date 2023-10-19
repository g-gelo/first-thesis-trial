export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let osas = null;

    if (body.id) {
        osas = await prisma.oSASProfile.delete({
            where: {
                id: body.id,
            },
        });
    }

    return osas;
});

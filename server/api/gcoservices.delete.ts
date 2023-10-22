export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let gcoServices = null;

    if (body.id) {
        gcoServices = await prisma.gCOServices.delete({
            where: {
                id: body.id,
            },
        });
    }

    return gcoServices;
});

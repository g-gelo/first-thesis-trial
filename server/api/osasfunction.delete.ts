export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context; // Assuming you have the Prisma instance available in event.context

    let osasFunction = null;

    if (body.id) {
        osasFunction = await prisma.oSASFunctions.delete({
            where: {
                id: body.id,
            },
        });
    }

    return osasFunction;
});

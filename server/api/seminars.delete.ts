export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context; // Assuming you have the Prisma instance available in event.context

    let seminar = null;

    if (body.id) {
        seminar = await prisma.seminar.delete({
            where: {
                id: body.id,
            },
        });
    }

    return seminar;
});

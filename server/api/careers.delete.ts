export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let career = null;

    if (body.id) {
        career = await prisma.career.delete({
            where: {
                id: body.id,
            },
        });
    }

    return career;
});

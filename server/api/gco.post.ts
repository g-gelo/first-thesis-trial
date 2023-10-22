export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let gco = null;

    if (body.title && body.description)
        await event.context.prisma.gCOProfile
            .create({
                data: {
                    title: body.title,
                    description: body.description,
                },
            })
            .then((response) => {
                gco = response;
            });
    return {
        gco,
    };
});

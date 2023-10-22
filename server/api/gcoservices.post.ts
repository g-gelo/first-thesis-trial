export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let gcoService = null;

    if (body.service)
        await event.context.prisma.gCOServices
            .create({
                data: {
                    service: body.service,
                },
            })
            .then((response) => {
                gcoService = response;
            });
    return {
        gcoService,
    };
});

/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let osasfunction = null;

    if (body.osasFunction)
        await event.context.prisma.oSASFunctions
            .create({
                data: {
                    osasFunction: body.osasFunction,
                },
            })
            .then((response) => {
                osasfunction = response;
            });
    return {
        osasfunction,
    };
});

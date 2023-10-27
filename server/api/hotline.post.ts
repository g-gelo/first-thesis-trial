/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let hotline = null;

    if (body.organization && body.number && body.location)
        await event.context.prisma.emegergencyHotline
            .create({
                data: {
                    organization: body.organization,
                    number: body.number,
                    location: body.location,
                },
            })
            .then((response) => {
                hotline = response;
            });
    return {
        hotline,
    };
});

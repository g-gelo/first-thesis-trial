/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let career = null;

    if (body.title && body.date && body.time && body.location)
        await event.context.prisma.career
            .create({
                data: {
                    title: body.title,
                    date: body.date,
                    time: body.time,
                    location: body.location,
                },
            })
            .then((response) => {
                career = response;
            });

    return {
        career,
    };
});

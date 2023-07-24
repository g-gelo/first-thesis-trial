/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let seminar = null;

    if (body.title && body.date && body.time && body.location)
        await event.context.prisma.seminar
            .create({
                data: {
                    title: body.title,
                    description: body.description,
                    date: body.date,
                    time: body.time,
                    location: body.location,
                },
            })
            .then((response) => {
                seminar = response;
            });

    return {
        seminar,
    };
});

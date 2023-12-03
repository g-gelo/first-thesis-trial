/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let seminar = null;

    if (body.title && body.guest_speaker && body.date && body.location)
        await event.context.prisma.seminar
            .create({
                data: {
                    title: body.title,
                    guest_speaker: body.guest_speaker,
                    date: body.date,
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

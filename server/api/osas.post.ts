/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let osas = null;

  if (body.description)
    await event.context.prisma.oSASProfile
      .create({
        data: {
          title: body.title,
          description: body.description,
        },
      })
      .then((response) => {
        osas = response;
      });
  return {
    osas,
  };
});

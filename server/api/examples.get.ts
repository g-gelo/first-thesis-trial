/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
export default defineEventHandler((event) => {
  return event.context.prisma.example.findMany();
});

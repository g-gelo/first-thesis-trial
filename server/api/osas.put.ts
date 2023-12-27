/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
import { PrismaClient } from "@prisma/client";

// Create an instance of the PrismaClient
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const title = body.title;
  const description = body.description;
  const isArchive = body.isArchive;

  let updatedOsas;

  if (id && title && description)
    updatedOsas = await prisma.oSASProfile.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        isArchive,
      },
    });

  return updatedOsas;
});

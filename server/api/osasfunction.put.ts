/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
import { PrismaClient } from "@prisma/client";

// Create an instance of the PrismaClient
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const osasFunction = body.osasFunction;
  const isArchive = body.isArchive;

  let updatedOsasFunction;

  if (id && osasFunction)
    updatedOsasFunction = await prisma.oSASFunctions.update({
      where: {
        id,
      },
      data: {
        osasFunction,
        isArchive,
      },
    });

  return updatedOsasFunction;
});

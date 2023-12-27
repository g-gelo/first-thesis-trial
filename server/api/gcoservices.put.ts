import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const service = body.service;
  const isArchive = body.isArchive;

  let updatedGcoService;

  if (id && service)
    updatedGcoService = await prisma.gCOServices.update({
      where: {
        id,
      },
      data: {
        service,
        isArchive,
      },
    });

  return updatedGcoService;
});

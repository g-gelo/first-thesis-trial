import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = body.id;
  const organization = body.organization;
  const number = body.number;
  const location = body.location;
  const isArchive = body.isArchive;

  let updatedEmergencyHotline;

  if (id && organization && number && location)
    updatedEmergencyHotline = await prisma.emegergencyHotline.update({
      where: {
        id,
      },
      data: {
        organization,
        number,
        location,
        isArchive,
      },
    });

  return updatedEmergencyHotline;
});

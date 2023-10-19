/**
 * Fetch all `examples` from the database. Run `pnpm prisma db push` at least once for this to work.
 */
import { PrismaClient } from "@prisma/client";

// Create an instance of the PrismaClient
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const description = body.description;

    let updatedMisnVis;

    if (id && description)
        updatedMisnVis = await prisma.universityMissionVision.update({
            where: {
                id,
            },
            data: {
                description,
            },
        });

    return updatedMisnVis;
});

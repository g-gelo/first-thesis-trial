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
    const location = body.location;
    const date = body.date;

    let updatedCareer;

    if (id && title && description && location && date)
        updatedCareer = await prisma.career.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                location,
                date,
            },
        });

    return updatedCareer;
});

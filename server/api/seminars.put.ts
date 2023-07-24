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
    const date = body.date;
    const time = body.time;
    const location = body.location;

    let updatedSeminar;

    if (id && title && description && date && time && location)
        updatedSeminar = await prisma.seminar.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                date,
                time,
                location,
            },
        });

    return updatedSeminar;
});

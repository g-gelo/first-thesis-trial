import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const description = body.description;

    let updatedMisnVis;

    if (id && title && description)
        updatedMisnVis = await prisma.universityMissionVision.update({
            where: {
                id,
            },
            data: {
                title,
                description,
            },
        });

    return updatedMisnVis;
});

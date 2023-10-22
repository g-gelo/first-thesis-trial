import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const title = body.title;
    const description = body.description;

    let updatedGco;

    if (id && title && description)
        updatedGco = await prisma.gCOProfile.update({
            where: {
                id,
            },
            data: {
                title,
                description,
            },
        });

    return updatedGco;
});

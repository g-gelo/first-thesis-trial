import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const keyword = body.keyword;
    const answer = body.answer;

    let updatedFaq;

    if (id && keyword && answer)
        updatedFaq = await prisma.chatBot.update({
            where: {
                id,
            },
            data: {
                keyword,
                answer,
            },
        });

    return updatedFaq;
});

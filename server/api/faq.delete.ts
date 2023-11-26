export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { prisma } = event.context;

    let faq = null;

    if (body.id) {
        faq = await prisma.chatBot.delete({
            where: {
                id: body.id,
            },
        });
    }

    return faq;
});

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let faq = null;

    if (body.keyword && body.answer)
        await event.context.prisma.chatBot
            .create({
                data: {
                    keyword: body.keyword,
                    answer: body.answer,
                },
            })
            .then((response) => {
                faq = response;
            });
    return {
        faq,
    };
});

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = body.id;
    const newRole = body.newRole;

    let updatedUser;

    if (id && newRole) {
        updatedUser = await prisma.user.update({
            where: {
                id,
            },
            data: {
                role: newRole,
            },
        });
    }

    return updatedUser;
});

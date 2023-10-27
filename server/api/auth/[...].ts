import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { NuxtAuthHandler } from "#auth";

type ProviderWithDefault<T> = T & { default: T };

const runtimeConfig = useRuntimeConfig();
const prisma = prismaClient();

async function getMe(session: any) {
    return await $fetch("/api/me", {
        method: "POST",
        query: {
            API_ROUTE_SECRET: runtimeConfig.API_ROUTE_SECRET,
        },
        body: {
            email: session?.user?.email,
        },
    });
}

export default NuxtAuthHandler({
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        session: async ({ session, token }) => {
            const me = await getMe(session);
            if (me) {
                session.subscribed = me.subscribed || false;
            }
            return Promise.resolve(session);
        },
    },
    providers: [
        (GoogleProvider as ProviderWithDefault<typeof GoogleProvider>).default({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
});

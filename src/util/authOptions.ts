import { NextAuthOptions } from "next-auth";
import { getServerBase } from "./ResourceServer";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3600
    },
    providers: [
        {
            id: "vapps",
            name: "VappsAuthorization",
            type: "oauth",
            version: "2.0",
            authorization: { params: { scope: process.env.VAPPS_SCOPES } },
            idToken: true,
            checks: ["state"],
            wellKnown: `${process.env.VAPPS_AUTHORIZATION_SERVER}/.well-known/oauth-authorization-server`,
            profile(profile, tokens) {
            return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email
                    };
            },
            clientId: process.env.VAPPS_CLIENT_ID,
            clientSecret: process.env.VAPPS_CLIENT_SECRET
        }
    ],
    pages: {
        signIn: "/auth/signin",
        error: "/auth/signin/error"
    },
    callbacks: {
        async signIn({ user, account, profile }) {

            console.log("Came into callback!");

            console.log(profile)
            const id = profile?.sub;

            const userResponse = await fetch(`${getServerBase()}/api/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${account?.access_token}`
                }
            });
            if (userResponse.ok) {
                return true;
            }

            let image = profile?.image;
            if (account?.provider === "google") {
                image = Object.create(profile as object).picture;
            } else if (account?.provider === "vapps") {
                image = Object.create(profile as object).image;
            }

            const userData = {
                id: profile?.sub,
                name: profile?.name,
                email: profile?.email,
                image,
                firstName: profile?.name,
                age: -1
            }

            const response = await fetch(`${getServerBase()}/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${account?.access_token}`
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                return true;
            } else if (response.status === 400 || response.status === 403) {
                console.log(await response.json())
            }

            return false;
        },
        async jwt({ token, account }) {
            if (account) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            session = Object.assign({}, session, { access_token: token?.access_token })
            return session;
        }
    }
}
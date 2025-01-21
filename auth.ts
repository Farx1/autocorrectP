import { PROJECT } from "@/constants/project";
import { db } from "@/db";
import ResetPasswordTemplate from "@/emails/reset-password";
import { VerifyEmailTemplate } from "@/emails/verify-email";
import redis from "@/lib/redis";
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { emailHarmony } from "better-auth-harmony";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    trustedOrigins: [process.env.BETTER_AUTH_URL!],
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        sendResetPassword: async ({ user, url }, request) => {
            const host = request?.headers.get("host") ?? "localhost:3000";

            const html = await render(
                ResetPasswordTemplate({
                    fullName: user.name,
                    url,
                    host,
                })
            );

            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL!,
                to: user.email,
                subject: `Reset your password for ${PROJECT.NAME}`,
                html,
            });
        },
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp }, request) {
                const host = request?.headers.get("host") ?? "localhost:3000";

                const html = await render(
                    VerifyEmailTemplate({
                        otp,
                        host,
                    })
                );

                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL!,
                    to: email,
                    subject: `Your verification code for ${PROJECT.NAME}`,
                    html,
                });
            },
        }),
        admin(),
        emailHarmony(),
    ],
    secondaryStorage: {
        get: async (key) => await redis.get(key),
        set: async (key, value, ttl) => {
            if (ttl) await redis.set(key, value, "EX", ttl);
            else await redis.set(key, value);
        },
        delete: async (key) => {
            await redis.del(key);
            return;
        },
    },
});

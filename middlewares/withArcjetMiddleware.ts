import arcjet, { detectBot, shield } from "@arcjet/next";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

const aj = arcjet({
    key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Bot detection rule
        detectBot({
            mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
            // Block all bots except the following
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "CATEGORY:MONITOR", // Uptime monitoring services
                "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
                "CATEGORY:SOCIAL", // Social media crawlers
                "CATEGORY:GOOGLE", // Google bot
            ],
        }),
    ],
});

export function withArcjetMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (request.method === "POST") {
            const decision = await aj.protect(request);

            if (decision.isDenied()) {
                if (decision.reason.isBot()) {
                    return NextResponse.json(
                        { error: "No bots allowed", reason: decision.reason },
                        { status: 403 }
                    );
                } else {
                    return NextResponse.json(
                        { error: "Forbidden", reason: decision.reason },
                        { status: 403 }
                    );
                }
            }
        }

        return middleware(request, event, response);
    };
}

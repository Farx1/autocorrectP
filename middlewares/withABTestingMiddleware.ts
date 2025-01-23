import { PAGES } from "@/constants/pages";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";
import { ABTestingService } from "@/lib/ab-testing";
import { UAParser } from "ua-parser-js";

export function withABTestingMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (request.nextUrl.pathname === PAGES.LANDING_PAGE) {
            try {
                // Extraire les conditions du visiteur
                const conditions = getVisitorConditions(request);
                
                // Sélectionner une variante
                const variantId = await ABTestingService.selectVariant(conditions);
                
                // Stocker la variante dans un cookie pour le tracking
                const response = NextResponse.next();
                response.cookies.set("landing_variant", variantId, {
                    maxAge: 60 * 60 * 24, // 24 heures
                    path: "/",
                    sameSite: "lax",
                });

                return response;
            } catch (error) {
                console.error("Error in AB testing middleware:", error);
                // En cas d'erreur, rediriger vers la variante par défaut
                return NextResponse.rewrite(new URL(PAGES.LANDING_PAGE_A, request.url));
            }
        }

        return middleware(request, event, response);
    };
}

function getVisitorConditions(request: NextRequest) {
    const ua = new UAParser(request.headers.get("user-agent") || "");
    const device = ua.getDevice();
    const geo = request.geo;
    const now = new Date();
    const hour = now.getUTCHours();

    return {
        deviceType: [device.type || "desktop"],
        country: geo?.country ? [geo.country] : undefined,
        timeOfDay: [getTimeOfDay(hour)],
    };
}

function getTimeOfDay(hour: number): string {
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 17) return "afternoon";
    if (hour >= 17 && hour < 21) return "evening";
    return "night";
}

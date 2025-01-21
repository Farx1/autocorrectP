import { PAGES } from "@/constants/pages";
import { showHomePage2 } from "@/flags";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export function withABTestingMiddleware(middleware: CustomMiddleware) {
    return async (
        request: NextRequest,
        event: NextFetchEvent,
        response: NextResponse
    ) => {
        if (request.nextUrl.pathname === PAGES.LANDING_PAGE) {
            const decision = await showHomePage2();

            const version = decision
                ? PAGES.LANDING_PAGE_B
                : PAGES.LANDING_PAGE_A;

            const nextUrl = new URL(version, request.url);

            return NextResponse.rewrite(nextUrl, { request });
        }

        return middleware(request, event, response);
    };
}

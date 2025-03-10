import { chain } from "@/middlewares/chain";
import { withArcjetMiddleware } from "@/middlewares/withArcjetMiddleware";

export default chain([withArcjetMiddleware]);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};

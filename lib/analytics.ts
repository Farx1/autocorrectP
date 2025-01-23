import posthog from "posthog-js";
import { type VariantMetric } from "@/types/landing-page";
import { db } from "@/db";
import { variantMetrics } from "@/db/schema";

export class AnalyticsService {
    static init() {
        if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
                api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
                persistence: "localStorage",
                autocapture: true,
                capture_pageview: false, // On gère manuellement les pages vues
            });
        }
    }

    static async trackPageView(variantId: string) {
        // Enregistrer dans PostHog
        posthog.capture("landing_page_view", {
            variant_id: variantId,
        });

        // Enregistrer dans notre base de données
        await db.insert(variantMetrics).values({
            variantId,
            metricType: "impression",
            value: 1,
        });
    }

    static async trackClick(variantId: string, elementId: string) {
        posthog.capture("landing_page_click", {
            variant_id: variantId,
            element_id: elementId,
        });

        await db.insert(variantMetrics).values({
            variantId,
            metricType: "click",
            value: 1,
        });
    }

    static async trackConversion(variantId: string, type: string) {
        posthog.capture("landing_page_conversion", {
            variant_id: variantId,
            conversion_type: type,
        });

        await db.insert(variantMetrics).values({
            variantId,
            metricType: "conversion",
            value: 1,
        });
    }

    static async trackBounce(variantId: string) {
        posthog.capture("landing_page_bounce", {
            variant_id: variantId,
        });

        await db.insert(variantMetrics).values({
            variantId,
            metricType: "bounce",
            value: 1,
        });
    }

    static async trackEngagement(
        variantId: string,
        timeOnPage: number,
        scrollDepth: number
    ) {
        posthog.capture("landing_page_engagement", {
            variant_id: variantId,
            time_on_page: timeOnPage,
            scroll_depth: scrollDepth,
        });
    }
} 
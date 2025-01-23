import { type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import { landingPageVariants, variantMetrics, abTestSessions, llmGenerations } from "@/db/schema";

// Database Models
export type LandingPageVariant = InferSelectModel<typeof landingPageVariants>;
export type NewLandingPageVariant = InferInsertModel<typeof landingPageVariants>;

export type VariantMetric = InferSelectModel<typeof variantMetrics>;
export type NewVariantMetric = InferInsertModel<typeof variantMetrics>;

export type ABTestSession = InferSelectModel<typeof abTestSessions>;
export type NewABTestSession = InferInsertModel<typeof abTestSessions>;

export type LLMGeneration = InferSelectModel<typeof llmGenerations>;
export type NewLLMGeneration = InferInsertModel<typeof llmGenerations>;

// A/B Testing Types
export interface LandingPageFlag {
    variantId: string;
    weight: number;
    conditions?: {
        deviceType?: string[];
        country?: string[];
        timeOfDay?: string[];
    };
}

export interface VariantConditions {
    deviceType?: string[];
    country?: string[];
    timeOfDay?: string[];
}

export interface PerformanceMetrics {
    impressions: number;
    clicks: number;
    conversions: number;
    bounces: number;
    timeOnPage: number;
    scrollDepth: number;
}

export interface PerformanceAnalysis {
    variantId: string;
    metrics: {
        conversionRate: number;
        engagementScore: number;
        bounceRate: number;
        averageTimeOnPage: number;
        averageScrollDepth: number;
    };
    confidence: number;
}

// Content Types
export interface LandingPageContent {
    hero: {
        title: string;
        subtitle: string;
        cta: {
            text: string;
            action: string;
        };
        image?: {
            src: string;
            alt: string;
        };
    };
    features: Array<{
        title: string;
        description: string;
        icon?: string;
    }>;
    testimonials?: Array<{
        text: string;
        author: string;
        role?: string;
        image?: string;
    }>;
    pricing?: Array<{
        plan: string;
        price: number;
        features: string[];
        cta: {
            text: string;
            action: string;
        };
    }>;
    style: {
        colorScheme: "light" | "dark";
        primaryColor: string;
        accentColor: string;
        fontFamily: string;
        layout: "centered" | "split" | "fullWidth";
    };
} 
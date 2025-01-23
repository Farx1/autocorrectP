import { pgTable, uuid, text, timestamp, jsonb, real, integer, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const variantStatusEnum = pgEnum("variant_status", [
    "draft",
    "active",
    "archived",
]);

export const metricTypeEnum = pgEnum("metric_type", [
    "impression",
    "click",
    "conversion",
    "bounce",
]);

export const abTestStatusEnum = pgEnum("ab_test_status", [
    "running",
    "completed",
    "terminated",
]);

// Tables
export const landingPageVariants = pgTable("landing_page_variants", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    content: jsonb("content").notNull(),
    status: variantStatusEnum("status").notNull().default("draft"),
    performanceScore: real("performance_score").default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    createdBy: text("created_by").notNull(),
    parentVariantId: uuid("parent_variant_id").references(() => landingPageVariants.id),
});

export const variantMetrics = pgTable("variant_metrics", {
    id: uuid("id").primaryKey().defaultRandom(),
    variantId: uuid("variant_id")
        .notNull()
        .references(() => landingPageVariants.id),
    metricType: metricTypeEnum("metric_type").notNull(),
    value: integer("value").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const abTestSessions = pgTable("ab_test_sessions", {
    id: uuid("id").primaryKey().defaultRandom(),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date"),
    status: abTestStatusEnum("status").notNull().default("running"),
    winningVariantId: uuid("winning_variant_id").references(() => landingPageVariants.id),
    configuration: jsonb("configuration").notNull(),
});

export const llmGenerations = pgTable("llm_generations", {
    id: uuid("id").primaryKey().defaultRandom(),
    prompt: text("prompt").notNull(),
    response: jsonb("response").notNull(),
    variantId: uuid("variant_id")
        .notNull()
        .references(() => landingPageVariants.id),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
    modelUsed: text("model_used").notNull(),
    performanceData: jsonb("performance_data"),
}); 
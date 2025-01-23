import { redis } from "@/lib/redis";
import { type LandingPageFlag, type VariantConditions } from "@/types/landing-page";
import { db } from "@/db";
import { landingPageVariants } from "@/db/schema";
import { eq } from "drizzle-orm";

const VARIANT_FLAGS_KEY = "landing_page:variant_flags";
const VARIANT_WEIGHTS_KEY = "landing_page:variant_weights";

export class ABTestingService {
    // Récupérer toutes les variantes actives avec leurs poids
    static async getActiveVariants(): Promise<LandingPageFlag[]> {
        const cachedFlags = await redis.get(VARIANT_FLAGS_KEY);
        if (cachedFlags) {
            return JSON.parse(cachedFlags);
        }

        const variants = await db.query.landingPageVariants.findMany({
            where: eq(landingPageVariants.status, "active"),
        });

        const flags: LandingPageFlag[] = variants.map((variant) => ({
            variantId: variant.id,
            weight: 1, // Poids égal par défaut
            conditions: {},
        }));

        await redis.set(VARIANT_FLAGS_KEY, JSON.stringify(flags), "EX", 3600); // Cache pour 1 heure
        return flags;
    }

    // Sélectionner une variante pour un visiteur
    static async selectVariant(
        conditions: VariantConditions = {}
    ): Promise<string> {
        const variants = await this.getActiveVariants();
        const eligibleVariants = variants.filter((variant) =>
            this.checkConditions(variant, conditions)
        );

        if (eligibleVariants.length === 0) {
            throw new Error("No eligible variants found");
        }

        // Algorithme Multi-Armed Bandit simplifié (epsilon-greedy)
        const epsilon = 0.1; // 10% d'exploration
        if (Math.random() < epsilon) {
            // Exploration: choisir une variante au hasard
            const randomIndex = Math.floor(
                Math.random() * eligibleVariants.length
            );
            return eligibleVariants[randomIndex].variantId;
        } else {
            // Exploitation: choisir la variante avec le meilleur poids
            const bestVariant = eligibleVariants.reduce((prev, current) =>
                prev.weight > current.weight ? prev : current
            );
            return bestVariant.variantId;
        }
    }

    // Vérifier si une variante correspond aux conditions
    private static checkConditions(
        variant: LandingPageFlag,
        conditions: VariantConditions
    ): boolean {
        if (!variant.conditions) return true;

        for (const [key, value] of Object.entries(conditions)) {
            const variantCondition = variant.conditions[key as keyof VariantConditions];
            if (
                variantCondition &&
                !variantCondition.some((condition) => value?.includes(condition))
            ) {
                return false;
            }
        }

        return true;
    }

    // Mettre à jour les poids des variantes
    static async updateVariantWeights(weights: Record<string, number>): Promise<void> {
        const variants = await this.getActiveVariants();
        const updatedVariants = variants.map((variant) => ({
            ...variant,
            weight: weights[variant.variantId] || variant.weight,
        }));

        await redis.set(VARIANT_FLAGS_KEY, JSON.stringify(updatedVariants), "EX", 3600);
    }

    // Normaliser les poids pour qu'ils somment à 1
    static normalizeWeights(weights: Record<string, number>): Record<string, number> {
        const total = Object.values(weights).reduce((sum, weight) => sum + weight, 0);
        const normalized: Record<string, number> = {};
        
        for (const [variantId, weight] of Object.entries(weights)) {
            normalized[variantId] = weight / total;
        }
        
        return normalized;
    }
} 
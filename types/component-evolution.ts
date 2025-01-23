import { type LandingPageContent } from "./landing-page";

export type ComponentType = "hero" | "feature" | "testimonial" | "pricing" | "cta";

export interface EvolvingComponent {
    id: string;
    type: ComponentType;
    version: number;
    content: any; // Contenu spécifique au type
    parentId?: string; // ID du composant dont celui-ci est dérivé
    performance: {
        clicks: number;
        viewTime: number;
        conversions: number;
        score: number;
    };
    metadata: {
        generationPrompt?: string;
        improvements?: string[];
        reasoning?: string;
    };
}

export interface ComponentEvolutionHistory {
    componentId: string;
    versions: Array<{
        version: number;
        timestamp: Date;
        changes: string[];
        performance: {
            beforeScore: number;
            afterScore: number;
        };
    }>;
}

export interface ComponentVariation {
    original: EvolvingComponent;
    variations: EvolvingComponent[];
    winningVersion?: number;
    testStatus: "pending" | "running" | "completed";
}

// Types pour les prompts de génération
export interface ComponentGenerationPrompt {
    type: ComponentType;
    context: {
        purpose: string;
        targetAudience: string;
        constraints: string[];
        previousPerformance?: {
            strengths: string[];
            weaknesses: string[];
        };
    };
    style: {
        tone: string;
        visualStyle: string;
        brandGuidelines: string[];
    };
}

// Types pour les règles d'évolution
export interface EvolutionRules {
    minTestDuration: number; // en heures
    minSampleSize: number;
    confidenceThreshold: number;
    maxVariations: number;
    improvementThreshold: number; // % d'amélioration minimum pour adopter une variation
}

// Types pour les métriques de composants
export interface ComponentMetrics {
    viewCount: number;
    uniqueViewCount: number;
    clickCount: number;
    clickThroughRate: number;
    averageViewTime: number;
    heatmapData?: {
        clicks: Array<{ x: number; y: number; count: number }>;
        scroll: Array<{ depth: number; time: number }>;
    };
} 
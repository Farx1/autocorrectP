import { useState, useEffect, useRef } from "react";
import { type EvolvingComponent, type ComponentMetrics } from "@/types/component-evolution";
import { ComponentEvolutionService } from "@/lib/component-evolution";
import { AnalyticsService } from "@/lib/analytics";

interface UseEvolvingComponentProps {
    componentId: string;
    initialContent: any;
    type: EvolvingComponent["type"];
}

export function useEvolvingComponent({
    componentId,
    initialContent,
    type,
}: UseEvolvingComponentProps) {
    const [component, setComponent] = useState<EvolvingComponent>({
        id: componentId,
        type,
        version: 1,
        content: initialContent,
        performance: {
            clicks: 0,
            viewTime: 0,
            conversions: 0,
            score: 0,
        },
        metadata: {},
    });

    const [metrics, setMetrics] = useState<ComponentMetrics>({
        viewCount: 0,
        uniqueViewCount: 0,
        clickCount: 0,
        clickThroughRate: 0,
        averageViewTime: 0,
        heatmapData: {
            clicks: [],
            scroll: [],
        },
    });

    const startTimeRef = useRef<number>(Date.now());
    const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
    const componentRef = useRef<HTMLDivElement | null>(null);

    // Initialiser le tracking
    useEffect(() => {
        if (!componentRef.current) return;

        // Observer la visibilité du composant
        intersectionObserverRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startTimeRef.current = Date.now();
                        setMetrics((prev) => ({
                            ...prev,
                            viewCount: prev.viewCount + 1,
                        }));
                    } else {
                        // Calculer le temps passé sur le composant
                        const timeSpent = Date.now() - startTimeRef.current;
                        setMetrics((prev) => ({
                            ...prev,
                            averageViewTime:
                                (prev.averageViewTime * prev.viewCount + timeSpent) /
                                (prev.viewCount + 1),
                        }));
                    }
                });
            },
            { threshold: 0.5 }
        );

        intersectionObserverRef.current.observe(componentRef.current);

        return () => {
            intersectionObserverRef.current?.disconnect();
        };
    }, []);

    // Tracker les clics
    useEffect(() => {
        if (!componentRef.current) return;

        const handleClick = (e: MouseEvent) => {
            const rect = componentRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            setMetrics((prev) => ({
                ...prev,
                clickCount: prev.clickCount + 1,
                clickThroughRate: (prev.clickCount + 1) / prev.viewCount,
                heatmapData: {
                    ...prev.heatmapData,
                    clicks: [
                        ...(prev.heatmapData?.clicks || []),
                        { x, y, count: 1 },
                    ],
                },
            }));
        };

        componentRef.current.addEventListener("click", handleClick);

        return () => {
            componentRef.current?.removeEventListener("click", handleClick);
        };
    }, []);

    // Tracker le scroll
    useEffect(() => {
        if (!componentRef.current) return;

        const handleScroll = () => {
            const rect = componentRef.current?.getBoundingClientRect();
            if (!rect) return;

            const scrollDepth = (window.innerHeight - rect.top) / rect.height;

            setMetrics((prev) => ({
                ...prev,
                heatmapData: {
                    ...prev.heatmapData,
                    scroll: [
                        ...(prev.heatmapData?.scroll || []),
                        { depth: scrollDepth, time: Date.now() },
                    ],
                },
            }));
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Évoluer le composant basé sur les métriques
    useEffect(() => {
        const evolveComponent = async () => {
            if (metrics.viewCount < 100) return; // Attendre suffisamment de données

            const newVariation = await ComponentEvolutionService.generateVariation(
                component,
                metrics
            );

            if (newVariation) {
                setComponent(newVariation);
                // Réinitialiser les métriques pour la nouvelle version
                setMetrics({
                    viewCount: 0,
                    uniqueViewCount: 0,
                    clickCount: 0,
                    clickThroughRate: 0,
                    averageViewTime: 0,
                    heatmapData: {
                        clicks: [],
                        scroll: [],
                    },
                });
            }
        };

        evolveComponent();
    }, [metrics.viewCount]);

    return {
        component,
        metrics,
        ref: componentRef,
    };
} 
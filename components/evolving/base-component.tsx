"use client";

import { type ComponentType } from "@/types/component-evolution";
import { useEvolvingComponent } from "@/hooks/useEvolvingComponent";
import { cn } from "@/utils/cn";

interface BaseComponentProps {
    id: string;
    type: ComponentType;
    initialContent: any;
    className?: string;
    children: (content: any) => React.ReactNode;
}

export function BaseComponent({
    id,
    type,
    initialContent,
    className,
    children,
}: BaseComponentProps) {
    const { component, ref } = useEvolvingComponent({
        componentId: id,
        type,
        initialContent,
    });

    return (
        <div
            ref={ref}
            className={cn(
                "relative transition-all duration-500 ease-in-out",
                className
            )}
            data-component-id={id}
            data-component-version={component.version}
        >
            {children(component.content)}
        </div>
    );
} 
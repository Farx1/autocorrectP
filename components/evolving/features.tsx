"use client";

import { BaseComponent } from "./base-component";
import { type LandingPageContent } from "@/types/landing-page";
import { cn } from "@/utils/cn";
import { RiCheckLine } from "@remixicon/react";

interface FeaturesProps {
    id: string;
    initialContent: LandingPageContent["features"];
    className?: string;
}

export function Features({ id, initialContent, className }: FeaturesProps) {
    return (
        <BaseComponent
            id={id}
            type="feature"
            initialContent={initialContent}
            className={className}
        >
            {(content: LandingPageContent["features"]) => (
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-primary-base">
                                Fonctionnalités
                            </h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                                Tout ce dont vous avez besoin
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Des outils puissants pour répondre à tous vos besoins
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                {content.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="flex flex-col transition-all duration-300 hover:scale-105"
                                    >
                                        <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-base text-white">
                                                {feature.icon ? (
                                                    <span className="h-6 w-6">{feature.icon}</span>
                                                ) : (
                                                    <RiCheckLine className="h-6 w-6" />
                                                )}
                                            </div>
                                            {feature.title}
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                            <p className="flex-auto">{feature.description}</p>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            )}
        </BaseComponent>
    );
} 
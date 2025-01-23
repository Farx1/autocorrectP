"use client";

import { BaseComponent } from "./base-component";
import { type LandingPageContent } from "@/types/landing-page";
import Image from "next/image";

interface HeroProps {
    id: string;
    initialContent: LandingPageContent["hero"];
    className?: string;
}

export function Hero({ id, initialContent, className }: HeroProps) {
    return (
        <BaseComponent
            id={id}
            type="hero"
            initialContent={initialContent}
            className={className}
        >
            {(content: LandingPageContent["hero"]) => (
                <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-8 px-4 py-16 text-center md:px-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                        {content.title}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        {content.subtitle}
                    </p>
                    <div className="flex gap-4">
                        <a
                            href={content.cta.action}
                            className="rounded-lg bg-primary-base px-6 py-3 text-white shadow-sm hover:bg-primary-hover"
                        >
                            {content.cta.text}
                        </a>
                    </div>
                    {content.image && (
                        <div className="relative mt-8 aspect-video w-full max-w-5xl overflow-hidden rounded-xl">
                            <Image
                                src={content.image.src}
                                alt={content.image.alt}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </div>
            )}
        </BaseComponent>
    );
} 
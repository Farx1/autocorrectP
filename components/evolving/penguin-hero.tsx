"use client";

import { BaseComponent } from "./base-component";
import { type LandingPageContent } from "@/types/landing-page";
import { cn } from "@/utils/cn";
import { RiHeartFill } from "@remixicon/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface PenguinHeroProps {
    id: string;
    initialContent: {
        title: string;
        subtitle: string;
        helpCount: number;
        cta: {
            text: string;
            action: string;
        };
    };
    className?: string;
}

export function PenguinHero({ id, initialContent, className }: PenguinHeroProps) {
    const router = useRouter();

    return (
        <BaseComponent
            id={id}
            type="hero"
            initialContent={initialContent}
            className={className}
        >
            {(content) => (
                <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
                    {/* Floating Snow Particles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {Array.from({ length: 20 }).map((_, i) => {
                            const left = Math.random() * 100;
                            const top = Math.random() * 100;
                            const delay = Math.random() * 5;
                            return (
                                <div
                                    key={i}
                                    className="absolute animate-float snow-particle"
                                    style={{
                                        left: `${left}%`,
                                        top: `${top}%`,
                                        animationDelay: `${delay}s`,
                                    }}
                                >
                                    ❄️
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Content */}
                    <div className="relative z-10 text-center">
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <Image
                                src="/penguin-coding.png"
                                alt="Pingouin qui code"
                                width={300}
                                height={300}
                                className="mx-auto"
                            />
                        </motion.div>

                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                            {content.title}
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            {content.subtitle}
                        </p>

                        <div className="flex flex-col items-center gap-8">
                            <button
                                onClick={() => router.push(content.cta.action)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg flex items-center gap-2 transition-colors"
                            >
                                <RiHeartFill className="w-6 h-6" />
                                {content.cta.text}
                            </button>

                            <div className="text-gray-500 flex items-center gap-2">
                                <RiHeartFill className="w-5 h-5 text-red-500" />
                                <span className="text-lg">
                                    {content.helpCount.toLocaleString()} personnes ont déjà aidé le pingouin
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </BaseComponent>
    );
} 
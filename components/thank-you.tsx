"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import Image from "next/image";
import { RiHeartFill } from "@remixicon/react";
import { useRouter } from "next/navigation";

export function ThankYou() {
    const router = useRouter();

    useEffect(() => {
        confetti({
            particleCount: 50,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                    Merci d'avoir aidé le pingouin qui code !
                </h1>
                <button
                    onClick={() => router.push("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg flex items-center gap-2 transition-colors"
                >
                    <RiHeartFill className="w-6 h-6" />
                    Retourner voir le pingouin
                </button>
            </div>
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        <RiHeartFill className="w-8 h-8 text-red-500" />
                    </div>
                ))}
            </div>
        </div>
    );
} 
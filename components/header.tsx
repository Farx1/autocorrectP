"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Logo } from "./logo";

const ThemeSwitchWrapper = () => {
    const DynamicThemeSwitch = dynamic(() => import("./theme-switch"), {
        ssr: false,
    });
    return <DynamicThemeSwitch />;
};

export default function Header() {
    return (
        <div className="border-b border-stroke-soft-200">
            <header className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-label-md text-text-strong-950 font-mono"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Logo className="size-7" />
                    Impulse
                </Link>
                <ThemeSwitchWrapper />
            </header>
        </div>
    );
}

import { Providers } from "@/app/providers";
import { PROJECT } from "@/constants/project";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: {
        default: PROJECT.NAME,
        template: `${PROJECT.NAME} — %s`,
    },
    description: PROJECT.DESCRIPTION,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn(
                geistSans.variable,
                geistMono.variable,
                "antialiased"
            )}
        >
            <body className="bg-bg-white-0 text-text-strong-950">
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <main className="flex flex-1 flex-col">{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}

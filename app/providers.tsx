import { NotificationProvider } from "@/components/ui/notification-provider";
import { Provider as TooltipProvider } from "@/components/ui/tooltip";
import { CSPostHogProvider } from "@/lib/posthog/providers";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import CookieConsentBanner from "./_components/cookie-consent-banner";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <CSPostHogProvider>
            <ThemeProvider attribute="class">
                <NuqsAdapter>
                    <TooltipProvider>{children}</TooltipProvider>
                </NuqsAdapter>
            </ThemeProvider>
            <CookieConsentBanner />
            <NotificationProvider />
        </CSPostHogProvider>
    );
}

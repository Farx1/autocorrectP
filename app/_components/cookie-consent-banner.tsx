"use client";

import * as Alert from "@/components/ui/alert";
import * as Button from "@/components/ui/button";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type ConsentStatus = "yes" | "no" | "undecided";

export function cookieConsentGiven(): ConsentStatus {
    // Only run on client since localStorage is not available on server
    if (typeof window === "undefined") return "undecided";

    const consent = localStorage.getItem("cookie_consent");
    if (!consent) return "undecided";
    return consent as ConsentStatus;
}

export default function CookieConsentBanner() {
    const [isMounted, setIsMounted] = useState(false);
    const [consentGiven, setConsentGiven] = useLocalStorage<ConsentStatus>(
        "cookie_consent",
        "undecided"
    );

    const posthog = usePostHog();

    useEffect(() => {
        if (consentGiven !== "undecided") {
            posthog.set_config({
                persistence:
                    consentGiven === "yes" ? "localStorage+cookie" : "memory",
            });
        }
    }, [consentGiven, posthog]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (consentGiven !== "undecided" || !isMounted) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto md:max-w-md w-fit p-4 md:p-0">
            <Alert.Root
                variant="stroke"
                status="information"
                size="large"
            >
                <div className="space-y-5">
                    <div className="space-y-1.5">
                        <div className="text-label-sm">We value your privacy</div>
                        <div>
                            We use tracking cookies to understand how you use the
                            product and help us improve your experience. You can
                            choose to allow all cookies or opt out.
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button.Root
                            type="button"
                            variant="neutral"
                            mode="stroke"
                            className="w-full"
                            onClick={() => setConsentGiven("no")}
                        >
                            No Thanks
                        </Button.Root>
                        <Button.Root
                            type="button"
                            className="w-full"
                            onClick={() => setConsentGiven("yes")}
                        >
                            Allow All
                        </Button.Root>
                    </div>
                </div>
            </Alert.Root>
        </div>
    );
}

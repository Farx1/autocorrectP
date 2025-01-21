"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as LinkButton from "@/components/ui/link-button";
import { Logo } from "@/components/logo";
import { PAGES } from "@/constants/pages";

const actions = {
    [PAGES.SIGN_IN]: {
        text: "Don't have an account?",
        link: {
            label: "Register",
            href: PAGES.SIGN_UP,
        },
    },
    [PAGES.SIGN_UP]: {
        text: "Already have an account?",
        link: {
            label: "Login",
            href: PAGES.SIGN_IN,
        },
    },
    [PAGES.FORGOT_PASSWORD]: {
        text: "Changed your mind?",
        link: {
            label: "Go Back to Login",
            href: PAGES.SIGN_IN,
        },
    },
    [PAGES.VERIFICATION]: {
        text: "Changed your mind?",
        link: {
            label: "Go Back to Login",
            href: PAGES.SIGN_IN,
        },
    },
    [PAGES.RESET_PASSWORD]: {
        text: "Changed your mind?",
        link: {
            label: "Go Back to Login",
            href: PAGES.SIGN_IN,
        },
    },
};

export default function AuthHeader() {
    const pathname = usePathname();

    const action = actions[pathname as keyof typeof actions];

    if (!action) return null;

    return (
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between p-6">
            <Link href={PAGES.LANDING_PAGE}>
                <Logo className="size-10 shrink-0" />
            </Link>

            <div className="flex items-center gap-1.5">
                <div className="text-paragraph-sm text-text-sub-600">
                    {action.text}
                </div>
                <LinkButton.Root
                    variant="primary"
                    size="medium"
                    underline
                    asChild
                >
                    <Link href={action.link.href}>{action.link.label}</Link>
                </LinkButton.Root>
            </div>
        </div>
    );
}

"use client";

import { StaggeredFadeLoader } from "@/components/staggered-fade-loader";
import * as DigitInput from "@/components/ui/digit-input";
import * as Divider from "@/components/ui/divider";
import * as FancyButton from "@/components/ui/fancy-button";
import { FormGlobalMessage } from "@/components/ui/form";
import * as LinkButton from "@/components/ui/link-button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { verifyEmailSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiMailCheckFill } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface VerificationFormProps {
    email: string;
}

export function VerificationForm({ email }: VerificationFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { handleSubmit, formState, setValue, watch, setError } = useForm({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            otp: "",
        },
    });

    function onSubmit(values: z.infer<typeof verifyEmailSchema>) {
        setIsLoading(true);

        authClient.emailOtp.verifyEmail(
            {
                email: email,
                otp: values.otp,
            },
            {
                onError: (ctx) => {
                    console.log(ctx.error);
                    setError("otp", { message: ctx.error.message });
                },
                onResponse: () => {
                    setIsLoading(false);
                },
                onSuccess: () => {
                    router.push(
                        `/sign-in?message=Your email has been verified. You can now sign in to your account.`
                    );
                },
            }
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 rounded-20 bg-bg-white-0 p-5 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 md:p-8"
        >
            <div className="flex flex-col items-center gap-2">
                {/* icon */}
                <div
                    className={cn(
                        "relative flex size-[68px] shrink-0 items-center justify-center rounded-full backdrop-blur-xl lg:size-24",
                        // bg
                        "before:absolute before:inset-0 before:rounded-full",
                        "before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10"
                    )}
                >
                    <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 lg:size-16">
                        <RiMailCheckFill className="size-6 text-text-sub-600 lg:size-8" />
                    </div>
                </div>

                <div className="space-y-1 text-center">
                    <div className="text-title-h6 lg:text-title-h5">
                        Enter Verification Code
                    </div>
                    <div className="text-paragraph-sm text-text-sub-600 lg:text-paragraph-md">
                        We’ve sent a code to{" "}
                        <span className="font-medium text-text-strong-950">
                            {email}
                        </span>
                    </div>
                </div>
            </div>

            <Divider.Root />

            <DigitInput.Root
                numInputs={6}
                hasError={!!formState.errors.otp}
                onChange={(value) => {
                    setValue("otp", value);
                    if (value.length === 6) {
                        handleSubmit(onSubmit)();
                    }
                }}
                value={watch("otp")}
                shouldAutoFocus
            />

            <FormGlobalMessage variant="error">
                {formState.errors.otp?.message}
            </FormGlobalMessage>

            <FancyButton.Root
                variant="primary"
                size="medium"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <StaggeredFadeLoader variant="muted" />
                        Verifying...
                    </>
                ) : (
                    "Submit Code"
                )}
            </FancyButton.Root>

            <div className="flex flex-col items-center gap-1 text-center text-paragraph-sm text-text-sub-600">
                Experiencing issues receiving the code?
                <LinkButton.Root variant="black" size="medium" underline>
                    Resend code
                </LinkButton.Root>
            </div>
        </form>
    );
}

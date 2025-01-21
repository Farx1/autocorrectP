"use client";

import { PasswordInput } from "@/app/(auth)/_components/password-input";
import * as LevelBar from "@/components/level-bar";
import { StaggeredFadeLoader } from "@/components/staggered-fade-loader";
import * as Divider from "@/components/ui/divider";
import * as FancyButton from "@/components/ui/fancy-button";
import { FormMessage } from "@/components/ui/form";
import * as Label from "@/components/ui/label";
import { PAGES } from "@/constants/pages";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { resetPasswordSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    RiCheckboxCircleFill,
    RiCloseCircleFill,
    RiLockFill,
} from "@remixicon/react";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ResetPasswordFormProps {
    token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
    const [criteria, setCriteria] = React.useState({
        length: false,
        uppercase: false,
        number: false,
    });

    const form = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        form.setValue("password", value);
        setCriteria({
            length: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
        });
    };

    const countTrueCriteria = (criteria: {
        [key: string]: boolean;
    }): number => {
        return Object.values(criteria).filter((value) => value).length;
    };

    const trueCriteriaCount = countTrueCriteria(criteria);

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        setIsLoading(true);
        if (!token) return;

        await authClient.resetPassword(
            {
                newPassword: values.password,
                token: token,
            },
            {
                onError: (ctx) => {
                    form.setError("password", {
                        message: ctx.error.message,
                    });
                    setIsLoading(false);
                },
                onSuccess: () => {
                    router.push(
                        PAGES.SIGN_IN +
                            "?message=" +
                            "Your password has been changed"
                    );
                },
            }
        );
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-6 rounded-20 bg-bg-white-0 p-5 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 md:p-8"
        >
            {/* Icon and title section */}
            <div className="flex flex-col items-center space-y-2">
                <div
                    className={cn(
                        "relative flex size-[68px] shrink-0 items-center justify-center rounded-full backdrop-blur-xl lg:size-24",
                        "before:absolute before:inset-0 before:rounded-full",
                        "before:bg-gradient-to-b before:from-neutral-500 before:to-transparent before:opacity-10",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-gradient-to-b after:from-neutral-500 after:to-transparent after:opacity-[.16]",
                        "after:mask-exclude after:p-px"
                    )}
                >
                    <div className="relative z-10 flex size-12 items-center justify-center rounded-full bg-bg-white-0 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200 lg:size-16">
                        <RiLockFill className="size-6 text-text-sub-600 lg:size-8" />
                    </div>
                </div>

                <div className="space-y-1 text-center">
                    <div className="text-title-h6 lg:text-title-h5">
                        Reset Password
                    </div>
                    <div className="text-paragraph-sm text-text-sub-600 lg:text-paragraph-md">
                        Create a new password for your account.
                    </div>
                </div>
            </div>

            <Divider.Root variant="line-spacing" />

            {/* Password inputs */}
            <div className="space-y-3">
                <div className="space-y-1">
                    <Label.Root htmlFor="password">
                        New Password <Label.Asterisk />
                    </Label.Root>
                    <PasswordInput
                        id="password"
                        {...form.register("password")}
                        onChange={handlePasswordChange}
                    />
                    {form.formState.errors.password && (
                        <FormMessage variant="error">
                            {form.formState.errors.password.message}
                        </FormMessage>
                    )}
                </div>

                <div className="space-y-1">
                    <Label.Root htmlFor="confirm-password">
                        Confirm Password <Label.Asterisk />
                    </Label.Root>
                    <PasswordInput
                        id="confirm-password"
                        {...form.register("confirmPassword")}
                    />
                    {form.formState.errors.confirmPassword && (
                        <FormMessage variant="error">
                            {form.formState.errors.confirmPassword.message}
                        </FormMessage>
                    )}
                </div>

                {/* Password criteria */}
                <div className="mt-2.5 space-y-2">
                    <LevelBar.Root levels={3} level={trueCriteriaCount} />
                    <div className="text-paragraph-xs text-text-sub-600">
                        Must contain at least;
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-1.5 text-paragraph-xs text-text-sub-600"
                        )}
                    >
                        {criteria.uppercase ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 1 uppercase
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-1.5 text-paragraph-xs text-text-sub-600"
                        )}
                    >
                        {criteria.number ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 1 number
                    </div>
                    <div
                        className={cn(
                            "flex items-center gap-1.5 text-paragraph-xs text-text-sub-600"
                        )}
                    >
                        {criteria.length ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 8 characters
                    </div>
                </div>
            </div>

            <FancyButton.Root
                variant="primary"
                size="medium"
                disabled={isLoading}
            >
                {isLoading ? (
                    <>
                        <StaggeredFadeLoader variant="muted" />
                        Resetting password...
                    </>
                ) : (
                    "Reset Password"
                )}
            </FancyButton.Root>
        </form>
    );
}

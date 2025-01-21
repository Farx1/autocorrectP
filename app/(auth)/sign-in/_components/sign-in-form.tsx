"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import {
    RiCheckboxCircleFill,
    RiErrorWarningFill,
    RiMailLine,
    RiUserFill,
} from "@remixicon/react";
import Link from "next/link";

import { PasswordInput } from "@/app/(auth)/_components/password-input";
import { StaggeredFadeLoader } from "@/components/staggered-fade-loader";
import * as Checkbox from "@/components/ui/checkbox";
import * as Divider from "@/components/ui/divider";
import * as FancyButton from "@/components/ui/fancy-button";
import { FormGlobalMessage, FormMessage } from "@/components/ui/form";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import * as LinkButton from "@/components/ui/link-button";
import { AUTH_ERRORS } from "@/constants/auth-errors";
import { PROJECT } from "@/constants/project";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/utils/cn";
import { signInSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SignInFormProps {
    message?: string;
}

export function SignInForm({ message }: SignInFormProps) {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState, setValue } = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    function onSubmit(values: z.infer<typeof signInSchema>) {
        setError(null);
        setIsLoading(true);

        authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: "/dashboard",
                rememberMe: values.rememberMe,
            },
            {
                onError: (ctx) => {
                    if (ctx.error.code === AUTH_ERRORS.EMAIL_NOT_VERIFIED) {
                        authClient.emailOtp.sendVerificationOtp(
                            {
                                email: values.email,
                                type: "email-verification",
                            },
                            {
                                onError: (ctx) => {
                                    setIsLoading(false);
                                    setError(ctx.error.message);
                                },
                                onSuccess: () => {
                                    router.push(
                                        `/verification?email=${values.email}`
                                    );
                                },
                            }
                        );
                    } else if (
                        ctx.error.code === AUTH_ERRORS.INVALID_EMAIL_OR_PASSWORD
                    ) {
                        setIsLoading(false);
                        setError("Invalid email or password");
                    } else {
                        setIsLoading(false);
                        setError(ctx.error.message);
                    }
                },
            }
        );
    }

    return (
        <div className="w-full max-w-[472px] px-4">
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
                            <RiUserFill className="size-6 text-text-sub-600 lg:size-8" />
                        </div>
                    </div>

                    <div className="space-y-1 text-center">
                        <div className="text-title-h6 lg:text-title-h5">
                            Login to your account
                        </div>
                        <div className="text-paragraph-sm text-text-sub-600 lg:text-paragraph-md">
                            Enter your details to login.
                        </div>
                    </div>
                </div>

                <Divider.Root />

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <Label.Root htmlFor="email">
                            Email Address <Label.Asterisk />
                        </Label.Root>
                        <Input.Root hasError={!!formState.errors.email}>
                            <Input.Wrapper>
                                <Input.Icon as={RiMailLine} />
                                <Input.Input
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder={`hello@${PROJECT.DOMAIN}`}
                                    required
                                />
                            </Input.Wrapper>
                        </Input.Root>
                        <FormMessage>
                            {formState.errors.email?.message}
                        </FormMessage>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label.Root htmlFor="password">
                            Password <Label.Asterisk />
                        </Label.Root>
                        <PasswordInput
                            {...register("password")}
                            hasError={!!formState.errors.password}
                            id="password"
                            required
                        />
                        <FormMessage>
                            {formState.errors.password?.message}
                        </FormMessage>
                    </div>
                </div>

                <FormGlobalMessage variant="error" Icon={RiErrorWarningFill}>
                    {error}
                </FormGlobalMessage>

                {message && !error && (
                    <FormGlobalMessage
                        variant="success"
                        Icon={RiCheckboxCircleFill}
                    >
                        {message}
                    </FormGlobalMessage>
                )}

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-start gap-2">
                        <Checkbox.Root
                            id="agree"
                            onCheckedChange={(value) => {
                                setValue("rememberMe", !!value);
                            }}
                            {...register("rememberMe")}
                        />
                        <LabelPrimitive.Root
                            htmlFor="agree"
                            className="block cursor-pointer text-paragraph-sm"
                        >
                            Keep me logged in
                        </LabelPrimitive.Root>
                    </div>
                    <LinkButton.Root
                        variant="gray"
                        size="medium"
                        underline
                        asChild
                    >
                        <Link href="/forgot-password">Forgot password?</Link>
                    </LinkButton.Root>
                </div>

                <FancyButton.Root
                    variant="primary"
                    size="medium"
                    disabled={isLoading}
                >
                    {isLoading && <StaggeredFadeLoader variant="muted" />}
                    Login
                </FancyButton.Root>
            </form>
        </div>
    );
}

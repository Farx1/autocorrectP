"use client";

import { PasswordInput } from "@/app/(auth)/_components/password-input";
import * as LevelBar from "@/components/level-bar";
import { StaggeredFadeLoader } from "@/components/staggered-fade-loader";
import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import { FormGlobalMessage, FormMessage } from "@/components/ui/form";
import * as Label from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { changePasswordSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "@remixicon/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ChangePassword() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const uniqueId = React.useId();

    const [criteria, setCriteria] = React.useState({
        length: false,
        uppercase: false,
        number: false,
    });

    const form = useForm({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleNewPasswordChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        form.setValue("newPassword", value);
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

    async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const { error } = await authClient.changePassword({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
                revokeOtherSessions: true,
            });

            if (error) {
                setError(error?.message ?? "An error occurred");
                return;
            }

            setSuccess("Password updated successfully");
            form.reset();
        } catch (error) {
            // Handle error
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-4"
        >
            <div>
                <div className="text-label-md">Change Password</div>
                <p className="mt-1 text-paragraph-sm text-text-sub-600">
                    Update password for enhanced account security.
                </p>
            </div>

            <Divider.Root variant="line-spacing" />

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-current-password`}>
                        Current Password <Label.Asterisk />
                    </Label.Root>

                    <PasswordInput
                        id={`${uniqueId}-current-password`}
                        {...form.register("currentPassword")}
                        hasError={!!form.formState.errors.currentPassword}
                    />
                    {form.formState.errors.currentPassword && (
                        <FormMessage variant="error">
                            {form.formState.errors.currentPassword.message}
                        </FormMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-new-password`}>
                        New Password <Label.Asterisk />
                    </Label.Root>

                    <PasswordInput
                        id={`${uniqueId}-new-password`}
                        {...form.register("newPassword")}
                        onChange={handleNewPasswordChange}
                        hasError={!!form.formState.errors.newPassword}
                    />
                    {form.formState.errors.newPassword && (
                        <FormMessage variant="error">
                            {form.formState.errors.newPassword.message}
                        </FormMessage>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-confirm-password`}>
                        Confirm New Password <Label.Asterisk />
                    </Label.Root>

                    <PasswordInput
                        id={`${uniqueId}-confirm-password`}
                        {...form.register("confirmPassword")}
                        hasError={!!form.formState.errors.confirmPassword}
                    />
                    {form.formState.errors.confirmPassword && (
                        <FormMessage variant="error">
                            {form.formState.errors.confirmPassword.message}
                        </FormMessage>
                    )}
                </div>

                <div className="-mt-0.5 space-y-2">
                    <LevelBar.Root levels={3} level={trueCriteriaCount} />
                    <div className="text-paragraph-xs text-text-sub-600">
                        Must contain at least;
                    </div>
                    <div className="flex items-center gap-1.5 text-paragraph-xs text-text-sub-600">
                        {criteria.uppercase ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 1 uppercase
                    </div>
                    <div className="flex items-center gap-1.5 text-paragraph-xs text-text-sub-600">
                        {criteria.number ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 1 number
                    </div>
                    <div className="flex items-center gap-1.5 text-paragraph-xs text-text-sub-600">
                        {criteria.length ? (
                            <RiCheckboxCircleFill className="size-4 shrink-0 text-success-base" />
                        ) : (
                            <RiCloseCircleFill className="size-4 shrink-0 text-text-soft-400" />
                        )}
                        At least 8 characters
                    </div>
                </div>
            </div>

            {error && !success && (
                <FormGlobalMessage Icon={RiCloseCircleFill} variant="error">
                    {error}
                </FormGlobalMessage>
            )}
            {success && (
                <FormGlobalMessage
                    Icon={RiCheckboxCircleFill}
                    variant="success"
                >
                    {success}
                </FormGlobalMessage>
            )}

            <div className="mt-1 grid grid-cols-2 gap-3">
                <Button.Root
                    type="button"
                    variant="neutral"
                    mode="stroke"
                    onClick={() => form.reset()}
                >
                    Discard
                </Button.Root>
                <Button.Root type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <StaggeredFadeLoader variant="muted" />
                            Applying
                        </>
                    ) : (
                        "Apply Changes"
                    )}
                </Button.Root>
            </div>
        </form>
    );
}

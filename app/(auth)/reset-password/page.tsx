import { type SearchParams } from "nuqs/server";
import { searchParamsCache } from "./seachParams";
import { ResetPasswordForm } from "./_components/reset-password-form";
import { redirect } from "next/navigation";
import { PAGES } from "@/constants/pages";

type ResetPasswordPageProps = {
    searchParams: Promise<SearchParams>;
};

export default async function PageResetPassword({
    searchParams,
}: ResetPasswordPageProps) {
    const { token, error } = await searchParamsCache.parse(searchParams);

    if (error) {
        redirect(
            PAGES.FORGOT_PASSWORD +
            "?error=" +
            "This link is invalid or expired"
        );
    }

    if (!token) {
        redirect(PAGES.SIGN_IN);
    }

    return (
        <div className="w-full max-w-[472px] px-4">
            <ResetPasswordForm token={token} />
        </div>
    );
}

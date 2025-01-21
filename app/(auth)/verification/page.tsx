import { Metadata } from "next";
import { VerificationForm } from "./_components/verification-form";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Verify your email",
};
type SearchParams = Promise<{ email?: string }>;

export default async function PageResetPassword({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { email } = await searchParams;

    if (!email) {
        return redirect("/sign-up");
    }

    return (
        <div className="w-full max-w-[472px] px-4">
            <VerificationForm email={email} />
        </div>
    );
}

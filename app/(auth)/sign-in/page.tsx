import { Metadata } from "next";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = {
    title: "Sign In",
};

type SearchParams = Promise<{ message: string }>;

export default async function PageLogin({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const { message } = await searchParams;

    return <SignInForm message={message} />;
}

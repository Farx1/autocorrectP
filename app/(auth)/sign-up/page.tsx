import { Metadata } from "next";
import { SignUpForm } from "./_components/sign-up-form";

export const metadata: Metadata = {
    title: "Register",
};

export default function PageRegister() {
    return <SignUpForm />;
}

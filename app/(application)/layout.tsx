import { auth } from "@/auth";
import { PAGES } from "@/constants/pages";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchMenu } from "@/components/search";
import HeaderMobile from "./_components/header-mobile";
import Sidebar from "./_components/sidebar";
import { AuthStoreProvider } from "@/providers/auth-store-provider";

export default async function ApplicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authResponse = await auth.api.getSession({
        headers: await headers(),
    });

    if (!authResponse?.user) {
        redirect(PAGES.SIGN_IN);
    }

    return (
        <AuthStoreProvider
            initialState={{
                session: authResponse.session,
                user: authResponse.user,
            }}
        >
            <div className="grid min-h-screen grid-cols-1 content-start items-start lg:grid-cols-[auto,minmax(0,1fr)]">
                <Sidebar />
                <HeaderMobile />
                <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col">
                    {children}
                </div>
            </div>

            <SearchMenu />
        </AuthStoreProvider>
    );
}

import { unstable_flag as flag } from "@vercel/flags/next";

export const showHomePage2 = flag({
    key: "home-page-2",
    decide: () => Math.random() > 0.5,
});

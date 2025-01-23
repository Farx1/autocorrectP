export const AUTH_PAGES = {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    FORGOT_PASSWORD: "/forgot-password",
    VERIFICATION: "/verification",
    RESET_PASSWORD: "/reset-password",
};

export const MARKETING_PAGES = {
    LANDING_PAGE: "/",
    LANDING_PAGE_A: "/lp-a",
    LANDING_PAGE_B: "/lp-b",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRIVACY_POLICY: "/privacy-policy",
    TERMS_OF_SERVICE: "/terms-of-service",
    FAQ: "/faq",
};

export const APPLICATION_PAGES = {
    DASHBOARD: "/dashboard",
    PROFILE_SETTINGS: "/settings/profile-settings",
};

export const PAGES = {
    ...AUTH_PAGES,
    ...MARKETING_PAGES,
    ...APPLICATION_PAGES,
};

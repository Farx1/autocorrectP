import { ThankYou } from "@/components/thank-you";
import { redis } from "@/lib/redis";
import { headers } from "next/headers";

async function incrementHelpCount() {
    await redis.incr("penguin_help_count");
}

export default async function ThankYouPage() {
    const headersList = headers();
    const referer = headersList.get("referer");

    // Incrémenter le compteur seulement si l'utilisateur vient de la page d'accueil
    if (referer?.includes("/")) {
        await incrementHelpCount();
    }

    return <ThankYou />;
} 
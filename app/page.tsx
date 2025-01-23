import { PenguinHero } from "@/components/evolving/penguin-hero";
import { redis } from "@/lib/redis";

async function getHelpCount() {
    const count = await redis.get("penguin_help_count");
    return parseInt(count || "0", 10);
}

export default async function HomePage() {
    const helpCount = await getHelpCount();

    return (
        <main>
            <PenguinHero
                id="penguin-hero"
                initialContent={{
                    title: "Le Pingouin qui Code",
                    subtitle: "Un petit pingouin passionné qui apprend à coder. Il a besoin de votre soutien pour continuer son aventure !",
                    helpCount,
                    cta: {
                        text: "Aider le Pingouin",
                        action: "/thank-you",
                    },
                }}
            />
        </main>
    );
} 
import { tasks } from "@trigger.dev/sdk/v3";
// Type import for the task
import type { helloWorldTask } from "@/trigger/example";

export async function GET() {
    // Trigger the task server side
    try {
        tasks.trigger<typeof helloWorldTask>("hello-world", { name: "John" });
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Task failed" }, { status: 500 });
    }

    return Response.json({ message: "Task triggered" });
}

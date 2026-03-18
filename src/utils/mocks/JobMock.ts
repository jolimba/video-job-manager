import { VideoJobResult } from "../../@types/VideoJobResult";
import { redis } from "../../infra/redis/RedisClient";

const statuses = ["queued", "processing", "completed", "failed"] as const;

const jobs = new Map<string, VideoJobResult>();

function randomStatus() {
    return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomPrompt() {
    const prompts = [
        "cat running in slow motion",
        "cyberpunk city at night",
        "dog flying a spaceship",
        "anime style battle scene",
        "drone shot over mountains"
    ];
    return prompts[Math.floor(Math.random() * prompts.length)]
}

export async function seedJobs(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
        const id = crypto.randomUUID();
        const status = randomStatus();
        const job = {
            id,
            status,
            prompt: randomPrompt(),
            videoUrl: status === "completed"
                ? `https://cdn.fake.video/${id}.mp4`
                : undefined,
            createdAt: new Date(Date.now() - Math.random() * 100000)
        };

        await redis.set(`job:${id}`, JSON.stringify(job));
        await redis.sAdd("jobs", id);
    }
}

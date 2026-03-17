import { VideoJobResult } from "../../@types/VideoJobResult";

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

export function seedJobs(count: number): Map<string, VideoJobResult> {
    for(let i = 0; i < count; i++) {
        const id = crypto.randomUUID();
        const status = randomStatus();
        const job = {
            id,
            status,
            prompt: randomPrompt(),
            videoUrl: status == "completed" ? `https://cdn.fake.video/${id}.mp4` : "undefined",
            createAt: new Date(Date.now() - Math.random() * 100000)
        }
        jobs.set(id, job);
    }
    return jobs
}

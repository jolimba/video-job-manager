import { VideoProvider } from "./VideoProvider";
import { VideoJobResult } from "../../@types/VideoJobResult"
import { seedJobs } from "../../utils/mocks/JobMock";
import { redis } from "../../infra/redis/RedisClient";

const jobList = seedJobs(100);
const jobs = new Map<string, VideoJobResult>();

export class MockSoraProvider implements VideoProvider {
    async createVideo(prompt: string): Promise<VideoJobResult> {
        const id = crypto.randomUUID();
        const job: VideoJobResult = {
            id,
            status: "queued"
        };
        jobs.set(id, job)
        this.simulateProcessing(job);
        await redis.set(
            `job:${id}`,
            JSON.stringify(job)
        );
        console.log("Saved in Redis:", `job:${id}`);
        return job;
    }

    async getJob(id: string): Promise<VideoJobResult> {
        const data = await redis.get(`job:${id}`);
        console.log("Fetched from Redis:", data);
        if (!data) {
            throw new Error("Job not found");
        }
        return JSON.parse(data);
    }

    private simulateProcessing(job: VideoJobResult) {
        setTimeout(() => {
            job.status = "processing"
        }, 2000);
        setTimeout(() => {
            job.status = "completed";
            job.videoUrl = `https://cdn.fake.video/${job.id}.mp4`;
        }, 6000);
    }
}
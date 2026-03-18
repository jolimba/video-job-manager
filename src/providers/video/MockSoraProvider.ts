import { VideoProvider } from "./VideoProvider";
import { VideoJobResult } from "../../@types/VideoJobResult"
import { seedJobs } from "../../utils/mocks/JobMock";
import { redis } from "../../infra/redis/RedisClient";
import { VideoJobStatus } from "../../@types/VideoJobResult"

const validStatus: VideoJobStatus[] = [
    "queued",
    "processing",
    "completed",
    "failed"
];

export class MockSoraProvider implements VideoProvider {
    async createVideo(prompt: string): Promise<VideoJobResult> {
        const id = crypto.randomUUID();
        const job: VideoJobResult = {
            id,
            status: "queued"
        };
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

    async getAllJobs(cursor: string = "0"): Promise<VideoJobResult[]> {
        const result: VideoJobResult[] = [];
        while (true) {
            const { cursor: nextCursor, keys } = await redis.scan(cursor, {MATCH: "job:*"});
            if (keys.length) {
                const values = await redis.mGet(keys);
                result.push(...values.filter(Boolean).map(v => JSON.parse(v!)));
            }
            if (nextCursor === "0") break;
            cursor = nextCursor;
        }
        return result;
    }

    async changeStatus(id: string, status: string): Promise<void> {
        if (!this.isValidStatus(status)) {
            throw new Error("Invalid status");
        }
        let job = await this.getJob(id);
        job.status = status as VideoJobStatus;
        await redis.set(`job:${job.id}`, JSON.stringify(job));
    }

    isValidStatus(status: any): boolean {
        return validStatus.includes(status)
    }
}
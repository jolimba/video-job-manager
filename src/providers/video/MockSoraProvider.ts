import { VideoProvider } from "./VideoProvider";
import { VideoJobResult } from "../../@types/VideoJobResult"
import { seedJobs } from "../../utils/mocks/JobMock";

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
        return job;
    }

    async getJob(id: string): Promise<VideoJobResult> {
        const job = jobList.get(id)
        if(!job) {
            throw new Error("Job not found.");
        }
        return job
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
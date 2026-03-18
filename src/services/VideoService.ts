import { MockSoraProvider } from "../providers/video/MockSoraProvider";

const provider = new MockSoraProvider();

export class VideoService {
    async create(prompt: string) {
        return provider.createVideo(prompt);
    }

    async list(id: string) {
        return provider.getJob(id);
    }

    async listAll() {
        return provider.getAllJobs();
    }

    async changeStatus(id: string, status: string) {
        console.log(status)
        return provider.changeStatus(id, status);
    }
}
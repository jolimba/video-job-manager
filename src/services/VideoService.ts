import { MockSoraProvider } from "../providers/video/MockSoraProvider";

const provider = new MockSoraProvider();

export class VideoService {
    async create(prompt: string) {
        return provider.createVideo(prompt);
    }

    async list(id: string) {
        return provider.getJob(id);
    }
}
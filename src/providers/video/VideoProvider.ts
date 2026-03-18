import { VideoJobResult } from "../../@types/VideoJobResult"

export interface VideoProvider {
    createVideo(prompt: string): Promise<VideoJobResult>;
    getJob(id: string): Promise<VideoJobResult>;
    isValidStatus(status: any): boolean;
}
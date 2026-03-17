export type VideoJobStatus = "queued" | "processing" | "completed" | "failed";

export interface VideoJobResult {
    id: string;
    status: VideoJobStatus;
    prompt?: string;
    videoUrl?: string;
    createdAt?: Date;
}
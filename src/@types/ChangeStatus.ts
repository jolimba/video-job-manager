export type VideoJobStatus = "queued" | "processing" | "completed" | "failed";

export interface ChangeType {
    id: string;
    status: VideoJobStatus;
}
import { Request, Response } from 'express';
import { VideoService } from "../services/VideoService";

const service = new VideoService();

export class JobController {
    async list(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id
        const job = await service.list(id);
        return res.json({job})
    }

    async create(req: Request, res: Response) {
        const { prompt } = req.body;
        const job = await service.create(prompt);
        return res.status(202).json(job);
    }
}
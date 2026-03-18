import { Request, Response } from 'express';
import { VideoService } from "../services/VideoService";
import { ChangeType } from "../@types/ChangeStatus"

const service = new VideoService();

export class JobController {
    async list(req: Request<{ id: string }>, res: Response) {
        const id = req.params.id;
        console.log(id);
        const job = await service.list(id);
        return res.json({job})
    }

    async listAll(req: Request, res: Response) {
        const jobList = await service.listAll();
        return res.json({jobList});
    }

    async create(req: Request, res: Response) {
        const { prompt } = req.body;
        const job = await service.create(prompt);
        return res.status(202).json(job);
    }

    async changeStatus(req: Request, res: Response) {
        const { id, status } = req.body;
        await service.changeStatus(id, status);
        return res.sendStatus(200);
    }

}
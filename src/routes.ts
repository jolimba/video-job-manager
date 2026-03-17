import { Request, Response, Router } from 'express';
import { JobController } from './controller/JobController';

const routes = Router();

const jobController = new JobController();

routes.post('/jobs', (req: Request, res: Response) => {
  const { prompt, model } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Please, provide a prompt' });
  }
  return jobController.create(req, res)
});

routes.get('/jobs/:id', (req: Request<{ id: string }>, res: Response) => jobController.list(req, res));

export { routes };
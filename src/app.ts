import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'express-async-errors';
import { routes } from './routes';

const app: Express = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/status', (req: Request, res: Response) => {
    return res.json({ status: 'online', "timestamp": new Date().toISOString() });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.use(routes);

export { app };
import express, { Application, Request, Response } from 'express';
import { UserRoutes, PhotoRoutes } from './routes';
import morgan from 'morgan';
import dotenv from 'dotenv';

const app: Application = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json() as express.RequestHandler);
app.use(express.urlencoded({ extended: true }) as express.RequestHandler);
app.use(morgan('dev') as express.RequestHandler);

// Routes with prefix /api/users
app.use('/api/users', UserRoutes);
app.use('/api/photos', PhotoRoutes);

// Resource not found
app.use('*', (_req: Request, res: Response) => {
    res.status(404).send('Not Found');
});

// Global Error Hanndler
app.use((err: Error, _req: Request, res: Response) => {
    res.status(500).send(err.message);
});

// Start Server
const host: string = String(process.env.HOST) || 'localhost';
const port: number = Number(process.env.PORT) || 8080;

app.listen(port, host, function() {
    console.log(`Server listens http://${host}:${port}`);
});
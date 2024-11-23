import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './routes';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes with prefix /api/users
app.use('/api/users', UserRoutes);

// Resource not found
app.use('*', (_req: Request, res: Response) => {
    res.status(404).send('Not Found');
});

// Global Error Hanndler
app.use((err: Error, _req: Request, res: Response) => {
    res.status(500).send(err.message);
});

const host = 'localhost';
const port = 3000;

app.listen(port, host, function() {
    console.log(`Server listens http://${host}:${port}`);
});
import express, { Application } from 'express';
import { Request, Response } from 'express';

const app: Application = express();

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

const host = 'localhost';
const port = 3000;

app.listen(port, host, function() {
    console.log(`Server listens http://${host}:${port}`);
});
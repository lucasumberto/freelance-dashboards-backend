import express, { Application } from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

export default app;
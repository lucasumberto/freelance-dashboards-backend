import express, { Application } from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes';
import financeRoutes from './routes/financeRoutes';
import clientRoutes from './routes/clientRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/projects', projectRoutes);
app.use('/finances', financeRoutes);
app.use('/clients', clientRoutes);
app.use('/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });
});

export default app;
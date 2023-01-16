import express from 'express';
import pictureRoutes from './routes/pictures.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/pictures', pictureRoutes);

export default app;

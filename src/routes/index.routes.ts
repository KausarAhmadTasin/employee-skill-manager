import express from 'express';
import healthRouter from './health.routes';
import compnayRouter from './company.routes';
import authRouter from './auth.route';

const routes = express.Router();

routes.use('/health', healthRouter);
routes.use('/company', compnayRouter);
routes.use('/auth', authRouter);

export default routes;

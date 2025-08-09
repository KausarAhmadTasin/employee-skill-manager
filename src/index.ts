import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import routes from './routes/index.routes';
import ClientIdMiddleware from './middlewares/clientid.middleware';
import asyncHandler from './middlewares/asyncHandler.middleware';
import errorHandler from './middlewares/errorHandler.middleware';
import passport from 'passport';
import { PassportConfig } from './config/passport.config';
import container from './config/ioc.config';
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//setup public directory
app.use(express.static(path.join(__dirname, 'public')));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//setup cors
app.use(cors());

app.use(passport.initialize());
container.get<PassportConfig>(PassportConfig);

app.use(asyncHandler(ClientIdMiddleware.verify));

//route setup
app.use('/api', routes);

// Error-handling middleware
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

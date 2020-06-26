import express from 'express';
import {Routes} from './routes';
import { errorHandle } from './midleware/error.midleware';

const app = express();
app.use(express.json());

Routes.map(route => {
  app.use(route.route, route.router)
})

app.use(errorHandle)

export default app;

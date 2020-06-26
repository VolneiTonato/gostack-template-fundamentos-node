import './config/env';
import App from './my_app';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Routes } from './routes';
import { errorHandle } from './midleware/error.midleware';


new App({
  _port: Number(process.env.PORT),
  _middlewares: [
    cors(),
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json()
  ],
  _errorMiddlewares: [errorHandle],
  _constrollers: Routes

}).listen()

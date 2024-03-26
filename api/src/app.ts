import Colston, { Context, Next, type IServerOptions } from '@colstonjs/core';
import cors from '@colstonjs/cors'
import { logger, requestID } from "./middleware";
import { router, router2 } from "./routes";

let middlewareCount: number = 0;
const options: IServerOptions = { prefix: '/api', eTag: true };
const app: Colston = new Colston(options);

const whitelist = ['http://localhost:5500', 'http://example1.com', 'http://example2.com', undefined /** <- loop back */]
const corsOptions = {
  origin: (origin: string, callback: Function): void => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}

// custom error handler
app.error = function <T>(error: T) {
  console.debug('error');
  throw error;
}

app.use(cors(corsOptions));
app.use(logger);
app.use(requestID);

app.get('/count/', (ctx: Context, next: Next) => {
  /**
   * req.locals can be used to pass
   * data from one middleware to another 
   */
  ctx.locals.middlewareCount = ++middlewareCount;
  // ctx.locals.middlewareCount
  next();
}, (ctx: Context, next: Next) => {
  ctx.locals.middlewareCount++;
  next();
}, (ctx: Context) => {
  ctx.locals.middlewareCount++;
  return ctx.status(200).text(ctx.locals.middlewareCount.toString());
});

// Sample GET request to request ID
app.get('/request-id', (ctx: Context) => {
  return ctx.status(200).json({
    message: "This will request a unique ID seen in the header of this request.",
    requestID: ctx.req.id
  });
});

/**
 * the app.all(...route: Router) mehtod
 * accepts k-numbers of router instance objects
 * where each router instance object are
 * @example
 *
 * router-1 = new Router().get(path, ...middlewares)
 * router-2 = new Router().post(path, ...niddlewares)
 * ...
 * router-k = new Router().<method>(path, ...middlewares)
 *
 * app.all(router-1, router-2, ..., router-k)
 * register all routes
 */

app.all(router, router2);

export default app

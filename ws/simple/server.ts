import Colston, { IServerOptions } from '@colstonjs/core/lib'
import { ServerWebSocket } from 'bun';

const options: IServerOptions = {
  eTag: false,
  ignoreTrailingSlash: false,
  websocket: { sendPings: false }
};

const app: Colston = new Colston(options);

/**
 * websocket
 */
app.ws('/ping', {
  close: () => console.log('disconnected.'),
  drain: (ws) => { console.log('drained'); ws.send('drained...') },
  message: <T>(ws: ServerWebSocket<T>, msg: any) => {
    ws.send('Pong!!!');
    // setTimeout(() => {
    //   ws.send('Pooooooooooong!!!');
    // }, 3000)
  },
  before: (ctx, ws) => {
    console.log(ctx.req.headers.get('sec-websocket-key'));
    return ctx;
  }
});

app.listen(8000, () => { console.log(':listening') });
import Colston, { IServerOptions } from '@colstonjs/core'

const options: IServerOptions = {
  eTag: false,
  ignoreTrailingSlash: false,
  websocket: {
    sendPings: false
  }
};

const app: Colston = new Colston(options);

app.ws('/chat', {
  before: (ctx, ws) => {
    if (!ctx.req.headers.get('token')) {
      ws?.send('Forbidden')
      ws?.close();
    }

    return ctx;
  },
  open(ws) {
    const token = ws.data.ctx.req.headers.get('token');
    if (!token) ws.close()

    console.log(token)
    const msg = `${token} has entered the chat`;
    ws.subscribe("the-group-chat");
    svr.publish("the-group-chat", msg);
  },
  drain: (ws) => { console.log('drained'); ws.send('drained...') },
  message: async (ws, msg: any) => {
    const username = await ws.data.ctx.req.body.username;
    svr.publish("the-group-chat", `${username}: ${msg}`);
  },
  close: async (ws) => {
    const username = await ws.data.ctx.req.body.username;
    const msg = `${username} has left the chat`;
    ws.unsubscribe("the-group-chat");
    svr.publish("the-group-chat", msg);
  },
});

const svr = app.listen(8000);
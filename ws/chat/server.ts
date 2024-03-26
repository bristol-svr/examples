import Colston, { IServerOptions } from '@colstonjs/core'
import { Server, ServerWebSocket } from 'bun';
import PubSubManager, { WSData } from './events/PubSubManager';

const options: IServerOptions = {
  eTag: false,
  ignoreTrailingSlash: false,
  websocket: {
    sendPings: false,
    idleTimeout: 960
  }
};

const manager = new PubSubManager();
const app: Colston = new Colston(options);

app.ws('/chat', {
  upgrade() {
    return {
      // should be generated on the fly
      id: 'random-id-string-' + (Math.floor(Math.random() * 999)),
      createdAt: Date.now()
    }
  },
  open(ws: ServerWebSocket<WSData>) {
    console.debug(`Client connected: ${JSON.stringify(ws.data.id)}`);
  },
  message: (ws: ServerWebSocket<WSData>, msg: string) => {
    let payload;
    try {
      payload = JSON.parse(msg);
    } catch (e) {
      /** noop */
      payload = {}
    }

    switch (payload.type) {
      case "subscribe": {
        manager.subscribe(payload.channel, ws);
        break;
      }
      case "unsubscribe": {
        manager.unSubscribe(payload.channel, ws);
        break;
      }
      case "publish": {
        manager.publish(payload.channel, payload.message);
        break;
      }
    }
  },
  close(ws: ServerWebSocket<WSData>) {
    console.debug(`Closing connection with client: ${ws.data.id}`);
    manager.onConnectionClose(ws);
  }
})

app.listen(8000, (svr: Server) => { console.log('listening on ' + svr.port) });

import { env } from "./env";
import { EventEmitter } from "./helpers/eventEmitter";

let ws: WebSocket;

export const msgEvent = new EventEmitter();

export function wsSendMessage(data: string) {
  ws.send(data);
}

export async function wsConnect() {
  return new Promise((resolve, reject) => {
    ws = new WebSocket(env.wsHost);
    console.log("try to connect");
    ws.onopen = () => {
      console.log("connected");
      resolve(null);
    };
    ws.onerror = (error) => {
      console.error(error);
      reject(error);
    };

    ws.onmessage = (ev) => {
      msgEvent.emit("msg", ev.data);
    };
  });
}

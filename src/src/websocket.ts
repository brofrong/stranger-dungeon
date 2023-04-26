import { env } from "./env";
import { EventEmitter } from "./helpers/eventEmitter";

let ws: WebSocket;

export const msgEvent = new EventEmitter();

export enum eventEnum {
  MSG = "msg",
}

export function wsSendMessage(event: eventEnum, data: any) {
  ws.send(JSON.stringify({ event, data }));
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
      try {
        const parsedData = JSON.parse(ev.data);
        msgEvent.emit(parsedData.event, parsedData.data);
      } catch (e) {
        console.error(`invalid data ${ev.data}`);
      }
    };
  });
}

import { createSignal } from "solid-js";
import { env } from "../helpers/env";
import { EventEmitter } from "../helpers/eventEmitter";
import { addMsg } from "./chat.service";

export const [ws, setWS] = createSignal<WebSocket | null>(null);

export const msgEvent = new EventEmitter();

export enum eventEnum {
  MSG = "msg",
}

export function wsSendMessage(msg: string) {
  ws()?.send(JSON.stringify({ event: eventEnum.MSG, data: msg }));
  addMsg(msg);
}

export function wsConnect(username: string, chatId?: string) {
  const url = new URL(env.wsHost);
  url.searchParams.append("username", username);
  if (chatId) url.searchParams.append("chatId", chatId);

  const ws = new WebSocket(url.toString());
  setWS(ws);

  console.log("try to connect");
  ws.onopen = () => {
    console.log(`connected to ${url}`);
  };
  ws.onerror = (error) => {
    console.error(error);
  };

  ws.onmessage = (ev) => {
    try {
      const parsedData = JSON.parse(ev.data);
      msgEvent.emit(parsedData.event, parsedData.data);
    } catch (e) {
      console.error(`invalid data ${ev.data}`);
    }
  };
  msgEvent.on("msg", addMsg);
  // onCleanup(() => {
  //   msgEvent.removeListener('msg', addMSg);
  // })
}

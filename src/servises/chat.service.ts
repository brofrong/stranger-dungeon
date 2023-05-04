import { createSignal } from "solid-js";

export const [messages, setMessages] = createSignal<string[]>([]);

export const addMsg = (msg: string) => {
  const currentMessages = messages();
  currentMessages.push(msg);
  setMessages([...currentMessages]);
};

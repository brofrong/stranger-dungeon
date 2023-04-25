import { Component, For, createSignal, onMount } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { msgEvent, wsConnect, wsSendMessage } from './src/websocket';

const App: Component = () => {

  const [messages, setMessages] = createSignal<string[]>([]);

  const addMSg = (msg: string) => {
    const currentMessages = messages();
    currentMessages.push(msg);
    setMessages([...currentMessages]);
  }

  onMount(async () => {
    await wsConnect();
    msgEvent.on('msg', (event) => {
      addMSg(event.data);
    });
  });

  const sendMsg = (e: KeyboardEvent & {
    currentTarget: HTMLInputElement;
    target: Element;
  }) => {
    if (e.key === "Enter") {
      const msg = e.currentTarget.value;
      e.currentTarget.value = '';
      addMSg(msg);
      wsSendMessage(msg);
    }

  }


  return (
    <div class="w-full min-h-screen p-4 bg-gray-800 text-white">
      <div class="bg-white rounded flex flex-col">
        <div class='h-96 overflow-y-scroll flex flex-col'>
          <For each={messages()}>
            {(message) => <Message message={message} />}
          </For>
        </div>
        <div>
          <div class="relative mt-2 rounded-md shadow-sm">
            <input onKeyDown={(e) => sendMsg(e)} type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="enter msg" />
          </div>
        </div>
      </div>

    </div>
  );
};

const Message: Component<{ message: string }> = ({ message }) => {
  return (
    <div class="border-t border-b border-gray-800 text-gray-600 p-4">{message}</div>
  )
}


export default App;

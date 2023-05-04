import { Component, For, Show, createSignal, onCleanup, onMount, } from 'solid-js';
import { eventEnum, msgEvent, ws, wsConnect, wsSendMessage } from './servises/websocket.service';
import CreateRoom from './components/CreateRoom';
import Chat from './components/Chat';

const App: Component = () => {

  return (
    <div class="w-full min-h-screen p-4 bg-gray-800 text-white flex">
      <Show when={ws()} fallback={<CreateRoom />}>
        <Chat></Chat>
      </Show>
    </div>
  );
};

export default App;

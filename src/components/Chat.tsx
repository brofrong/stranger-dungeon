import { Component, ComponentProps, For } from 'solid-js';
import { messages } from '../servises/chat.service';
import { eventEnum, wsSendMessage } from '../servises/websocket.service';

interface ChatProps extends ComponentProps<any> {
    // add props here
}

const Chat: Component<ChatProps> = (props: ChatProps) => {


    const sendMsg = (
        e: KeyboardEvent & {
            currentTarget: HTMLInputElement;
            target: Element;
        }
    ) => {
        if (e.key === "Enter") {
            const msg = e.currentTarget.value;
            e.currentTarget.value = "";
            wsSendMessage(msg);
        }
    };

    return (
        <div class="bg-white rounded flex flex-col flex-grow h-96 p-4" >
            <div class='overflow-y-scroll flex flex-col flex-grow'>
                <For each={messages()}>
                    {(message) => <Message message={message} />}
                </For>
            </div>
            <div class="relative mt-2 rounded-md shadow-sm">
                <input onKeyDown={(e) => sendMsg(e)} type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="enter msg" />
            </div>
        </div>

    )
}

const Message: Component<{ message: string }> = ({ message }) => {
    return (
        <div class="border-t border-b border-gray-800 text-gray-600 p-4">{message}</div>
    )
}


export default Chat;
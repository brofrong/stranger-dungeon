import { Component, ComponentProps, JSX, createSignal, on, onMount } from 'solid-js';
import Input from './Input';
import Button from './Button';
import ForwardIcon from '../assets/icons/arrow_forward_FILL0_wght400_GRAD0_opsz48.svg';
import { getUsername, saveUsername } from '../helpers/username.service';
import { wsConnect } from '../servises/websocket.service';

interface CreateRoomProps extends ComponentProps<any> {
    // add props here
}

const CreateRoom: Component<CreateRoomProps> = (props: CreateRoomProps) => {
    const [usernameInputEl, setUsernameInputEl] = createSignal<HTMLInputElement | null>(null)
    const username = getUsername();

    const OnCreate = () => {
        const username = usernameInputEl()?.value || 'Anonymous';
        saveUsername(username);
        wsConnect(username);
    }

    return (
        <div class='border-2 border-gray-500 rounded px-4 py-6 m-auto max-w-md flex-grow flex flex-col gap-6'>
            <h2 class="font-bold text-2xl">Welcome to Chat!</h2>
            <Input inputRef={setUsernameInputEl} label='Username' value={username} name='username' placeholder='Anonymous' />
            <div class='self-center'>
                <Button onClick={OnCreate}>Create <ForwardIcon /></Button>
            </div>
        </div>
    )
}

export default CreateRoom;
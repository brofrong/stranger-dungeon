import { Accessor, Component, ComponentProps, Setter, createUniqueId } from 'solid-js';

interface InputProps extends ComponentProps<any> {
    name?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    value: string | null,
    inputRef?: Setter<HTMLInputElement>,
}

const Input: Component<InputProps> = (props: InputProps) => {
    const id = createUniqueId();
    return (
        <div>
            <label for={id} class="block mb-2 text-sm font-medium text-white, ">{props.label}</label>
            <input type="text" id={id} name={props.name} value={props.value || ''} ref={props.inputRef} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={props.placeholder} required={props.required} />
        </div>
    )
}

export default Input;
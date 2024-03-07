import {PropsWithChildren, useState} from "react";

export default function FormSection({ children, title, visible = false, completed = false }: PropsWithChildren<{ title: string, visible: boolean, completed: boolean }>) {
    const [visibility, setVisibility] = useState(visible);
    return (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <button onClick={() => {setVisibility(!visibility)}} className="text-left w-full">
                <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100 p-4 bg-gray-200 dark:bg-gray-700 sm:rounded-lg relative">
                    {completed && (
                        <span className="text-green-500">&#xf058; </span>
                    ) || (
                        <span className="text-yellow-500">&#xf06a; </span>
                    )}
                    {title}
                    <span className="absolute right-4">
                        {visibility && (
                            <>&#xf077;</>
                        ) || (
                            <>&#xf078;</>
                        )}
                    </span>
                </h1>
            </button>
            <div style={{display: visibility ? 'block' : 'none'}} className="p-4 sm:p-8">
                {children}
            </div>
        </div>
    );
}

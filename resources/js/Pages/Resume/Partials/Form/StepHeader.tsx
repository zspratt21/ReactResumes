import { PropsWithChildren } from 'react';

export default function StepHeader({
    children, visible, disabled = true, completed = false, setVisibility,
}: PropsWithChildren<{ visible: () => boolean, completed: boolean, disabled: boolean, setVisibility: () => void }>) {
    return (
        <div className="">
            <button type="button" onClick={() => { setVisibility(); }} className="text-left w-full" disabled={disabled}>
                <h1 className="text-lg font-medium p-4 sm:rounded-lg relative">
                    {(completed && (
                        <span className="text-green-500">&#xf058; </span>
                    )) || (
                        <span className="text-yellow-500">&#xf06a; </span>
                    )}
                    {children}
                    <span className={`${visible() ? 'selected ' : ''}absolute right-4 selected:text-white selected:bg-gray-800 selected:dark:text-gray-800 selected:dark:bg-white px-2 rounded-full`}>
                        {(visible() && (
                            <>&#xf054;</>
                        )) || (
                            <>&#xf053;</>
                        )}
                    </span>
                </h1>
            </button>
        </div>
    );
}

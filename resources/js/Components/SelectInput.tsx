import React, { forwardRef, useEffect, useImperativeHandle, useRef, InputHTMLAttributes } from 'react';

export default forwardRef(function TextInput(
    { className = '', isFocused = false, ...props }: InputHTMLAttributes<HTMLSelectElement> & { isFocused?: boolean, options: {[key: string]: string} },
    ref
) {
    const localRef = useRef<HTMLInputElement>(null);
    const { options = [] } = props;

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
        >
            {Object.entries(options).map(([key, label]) => (
                <option key={key} value={key}>
                    {label}
                </option>
            ))}
        </select>
    );
});

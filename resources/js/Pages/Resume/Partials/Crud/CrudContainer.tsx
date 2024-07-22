import { forwardRef, ReactNode } from 'react';

type CrudContainerProps = {
    className?: string;
    children: ReactNode;
    isDraggingOver?: boolean;
};

export default forwardRef<HTMLDivElement, CrudContainerProps>(({
    className = '', children, isDraggingOver = false, ...props
}, ref) => (
    <div
        ref={ref}
        className={`flex flex-col border-x-2 border-b-2 rounded-b-lg border-gray-300 dark:border-gray-900 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-900 scrollbar-track-white dark:scrollbar-track-gray-800 ${isDraggingOver && 'dark:bg-green-900 bg-green-500'} ${className}`}
        {...props}
    >
        {children}
    </div>
));

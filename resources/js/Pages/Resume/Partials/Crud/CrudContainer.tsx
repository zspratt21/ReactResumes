import {forwardRef, ReactNode} from 'react';

type CrudContainerProps = {
    className?: string;
    children: ReactNode;
    isDraggingOver?: boolean;
};

export default forwardRef<HTMLDivElement, CrudContainerProps>(({ className = '', children, isDraggingOver, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={`flex flex-col border-x-2 border-b-2 rounded-b-lg border-gray-300 dark:border-gray-900 ${isDraggingOver && 'dark:bg-green-900 bg-green-500'} ${className}`}
            {...props}
        >
            {children}
        </div>
    );
});

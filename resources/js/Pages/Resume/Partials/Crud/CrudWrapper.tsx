import {forwardRef, ReactNode} from "react";

type CrudWrapperProps = {
    className?: string;
    children: ReactNode;
}

export default forwardRef<HTMLDivElement, CrudWrapperProps>(({ children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="flex p-2 hover:bg-gray-300 dark:hover:bg-gray-900"
            {...props}
        >
            {children}
        </div>
    );
});

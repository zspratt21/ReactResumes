export default function CrudView({text, className = '', setEdit, onDelete}: {text: string, className?: string, setEdit: () => void, onDelete: () => void}) {
    return (
        <div className={className}>
            <div className="flex justify-between text-black dark:text-white">
                <a className="flex-1 hover:text-green-500 cursor-pointer" onClick={setEdit}>
                    <span>{text}</span>
                </a>
                <div className="flex space-x-2">
                    <a className="hover:text-red-500 cursor-pointer" onClick={onDelete}>Delete</a>
                </div>
            </div>
        </div>
    );
}

import {Milestone} from "@/types/resume";

export default function ViewMilestone({milestone, className = '', setEdit}: {milestone: Milestone, className?: string, setEdit: () => void}) {
    return (
        <div className={className}>
            <div className="flex justify-between text-black dark:text-white">
                <a className="flex-1 hover:text-green-500 cursor-pointer" onClick={(e) => {e.preventDefault(); setEdit()}}>
                    <span>{milestone.name}</span>
                </a>
                <div className="flex space-x-2">
                    <a className="hover:text-red-500 cursor-pointer">Delete</a>
                </div>
            </div>
        </div>
    );
}

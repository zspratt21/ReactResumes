import {Experience} from "@/types/resume";
import SecondaryButton from "@/Components/SecondaryButton";

export default function ViewExperience({experience, className = '', setEdit}: { experience: Experience, className?: string, setEdit: () => void }) {
    return (
        <div className={className}>
            <div className="flex justify-between text-gray-600">
                <a className="dark:text-gray-400 dark:bg-gray-900 p-1 rounded-tl-md rounded-bl-md flex-1" onClick={(e) => {e.preventDefault(); setEdit()}}>
                    <span>{experience.title} @ {experience.entity}</span>
                </a>
                <div className="flex space-x-2">
                    <a className="p-1 rounded-br-md rounded-tr-md bg-gray-800 dark:bg-gray-200">Delete</a>
                </div>
            </div>
        </div>
    );
}

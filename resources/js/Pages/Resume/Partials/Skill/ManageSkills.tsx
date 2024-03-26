import PrimaryButton from "@/Components/PrimaryButton";
import {useForm, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {ReactElement, useEffect, useRef, useState} from "react";
import CrudSkill from "@/Pages/Resume/Partials/Skill/CrudSkill";
import {Skill, SkillPriority} from "@/types/resume";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";

export default function ManageSkills({className = '', onCompletionChange}: {className?: string, onCompletionChange: (isComplete: boolean) => void}) {
    const user = usePage<PageProps>().props.auth.user;
    const newSkillsContainerRef = useRef(null);
    const [newSkillFormComponents, setNewSkillFormComponents] = useState<ReactElement[]>([]);
    const [skills, setSkills] = useState<Skill[]>(() => user.skills);
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        priorities: [] as SkillPriority[],
        _method: 'patch',
    });

    const addSkill = () => {
        const newKey = Date.now();
        setNewSkillFormComponents(prevComponents => [
            ...prevComponents,
            <CrudSkill
                skill={null}
                key={newKey}
                onDelete={() => remove(newKey)}
                className="w-full"
            />
        ]);
    };

    const remove = (keyToDelete: number) => {
        setNewSkillFormComponents(prevComponents =>
            prevComponents.filter((component) => component.key !== keyToDelete.toString())
        );
    };

    const checkValidSkills = () => {
        onCompletionChange(skills.length > 0);
    }
    useEffect(checkValidSkills, [skills]);

    useEffect(() => {
        setSkills(user.skills);
    }, [user.skills]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(skills);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSkills(items);
        const priorities = items.map((skill, index) => {
            return {
                id: skill.id,
                priority: index,
            };
        });
        setData('priorities', priorities);
    }
    const firstUpdate = useRef(true);

    useEffect(() => {
       if (firstUpdate.current) {
           firstUpdate.current = false;
           return;
       }

       else {
           post(route('skills.prioritize'), {preserveScroll: true});
       }


    }, [data.priorities]);


    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Skills</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Add, modify, or remove skills from your profile.
                </p>
            </header>

            {skills.length > 0 && (
                <>
                    <h3 className="mt-6 text-md font-medium text-gray-900 dark:text-gray-100">Current Skills</h3>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {skills.map((skill, index) => (
                                        <Draggable key={skill.id} draggableId={skill.id.toString()} index={index}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        ref={provided.innerRef}
                                                        className="flex space-x-2 mt-4"
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <span className="text-5xl my-auto text-gray-700 dark:text-gray-300">&#xf07d;</span>
                                                        <CrudSkill skill={skill} onDelete={() => {}} className="w-full"/>
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </>
            )}

            {newSkillFormComponents.length > 0 && (
                <div ref={newSkillsContainerRef}>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-gray-100">New Skills</h3>
                    {newSkillFormComponents}
                </div>
            )}

            <div className="space-x-2 mt-4">
                <PrimaryButton onClick={addSkill}>&#xf055; Add Skill</PrimaryButton>
                {skills.length < 1 && (
                    <PrimaryButton onClick={() => {onCompletionChange(true)}}>&#xf04e; Skip</PrimaryButton>
                )}
            </div>
        </section>
    );
}

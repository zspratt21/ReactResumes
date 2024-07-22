import {Skill} from "@/types/resume";
import CrudSkill from "@/Pages/Resume/Partials/Skill/CrudSkill";
import {useEffect, useState} from "react";
import {usePage, router} from "@inertiajs/react";
import {PageProps} from "@/types";
import CrudView from "@/Pages/Resume/Partials/Crud/CrudView";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import CrudHeading from "@/Pages/Resume/Partials/Crud/CrudHeading";
import CrudContainer from "@/Pages/Resume/Partials/Crud/CrudContainer";
import CrudWrapper from "@/Pages/Resume/Partials/Crud/CrudWrapper";


export default function ManageSkills({className = '', onCompletionChange}: {className?: string, onCompletionChange: (isComplete: boolean) => void}) {
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const user = usePage<PageProps>().props.auth.user;
    const [skills, setSkills] = useState<Skill[]>(user.skills);

    const resetEditingSkill = () => {
        setEditingSkill(null);
    }

    const deleteSkill = (skill: Skill) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            if (skill.id === editingSkill?.id) {
                resetEditingSkill();
            }
            router.delete(
                route('skill.delete',
                    {
                        id: skill.id,
                    }),
                {
                    preserveScroll: true
                }
            );
        }
    }

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const items = Array.from(skills);
        const reorderedItem = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem[0]);
        setSkills(items);
        const priorities = items.map((skill, index) => {
            return {
                id: skill.id,
                priority: index,
            };
        });
        router.post(
            route('skills.prioritize'),
            {
                priorities: priorities,
                _method: 'patch',
            },
            {
                preserveScroll: true
            }
        );
    }

    useEffect(() => {
        setSkills(user.skills || []);
        onCompletionChange(user.skills?.length > 0);
        const newskill = user.skills.find(skill => skill.id === editingSkill?.id);
        setEditingSkill(newskill || null);
    }, [user.skills]);

    return (
        <section className={className}>
            <CrudHeading text="Skills" empty={skills.length < 1} />
            {(skills.length > 0 && (
                <div className="">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable" direction="vertical">
                            {(provided, snapshot) => (
                                <CrudContainer
                                    isDraggingOver={snapshot.isDraggingOver}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {skills.map((skill, index) => (
                                        <Draggable key={skill.id} draggableId={skill.id.toString()} index={index}>
                                            {(provided, snapshot) => {
                                                return (
                                                    <CrudWrapper
                                                        key={index}
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <CrudView
                                                            className="flex-1"
                                                            text={skill.name}
                                                            setEdit={() => {
                                                                setEditingSkill(skill);
                                                            }}
                                                            onDelete={() => {
                                                                deleteSkill(skill);
                                                            }}
                                                        />
                                                    </CrudWrapper>
                                                );
                                            }}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </CrudContainer>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )) || (
                <p className="text-gray-600 dark:text-gray-400">
                    You have not added any skills yet. Add one with the form below.
                </p>
            )}
            <CrudSkill
                skill={editingSkill}
                resetEditingSkill={resetEditingSkill}
                className="mt-4"
            />
        </section>
    );
}

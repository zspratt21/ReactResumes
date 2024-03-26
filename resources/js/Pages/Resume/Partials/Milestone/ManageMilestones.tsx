import {Experience, Milestone} from "@/types/resume";
import CrudMilestone from "@/Pages/Resume/Partials/Milestone/CrudMilestone";
import {useEffect, useState} from "react";
import {usePage, router} from "@inertiajs/react";
import {PageProps} from "@/types";
import CrudView from "@/Pages/Resume/Partials/Crud/CrudView";
import {DragDropContext, Draggable, Droppable, DropResult} from "@hello-pangea/dnd";
import CrudHeading from "@/Pages/Resume/Partials/Crud/CrudHeading";
import CrudContainer from "@/Pages/Resume/Partials/Crud/CrudContainer";
import CrudWrapper from "@/Pages/Resume/Partials/Crud/CrudWrapper";


export default function ManageMilestones({className = '', experience}: {className?: string, experience: Experience}) {
    const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null);
    const user = usePage<PageProps>().props.auth.user;
    const [milestones, setMilestones] = useState<Milestone[]>(experience.milestones);

    useEffect(() => {
        setEditingMilestone(null);
        setMilestones(experience.milestones);
    }, [experience.id]);

    useEffect(() => {
        setMilestones(user.experiences.find((exp) => exp.id === experience.id)?.milestones || []);
    }, [user.experiences]);

    const resetEditingMilestone = () => {
        setEditingMilestone(null);
    }

    const deleteMilestone = (milestone: Milestone) => {
        if (window.confirm('Are you sure you want to delete this milestone?')) {
            if (milestone.id === editingMilestone?.id) {
                resetEditingMilestone();
            }
            router.delete(
                route('milestone.delete',
                    {
                        id: milestone.id,
                        experience_id: experience.id
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
        const items = Array.from(milestones);
        const reorderedItem = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem[0]);
        setMilestones(items);
        const priorities = items.map((milestone, index) => {
            return {
                id: milestone.id,
                priority: index,
            };
        });
        router.post(
            route('milestones.prioritize'),
            {
                experience_id: experience.id,
                priorities: priorities,
                _method: 'patch',
            },
            {
                preserveScroll: true
            }
        );
    }

    return (
        <section className={className}>
            <CrudHeading text="Milestones" empty={milestones.length < 1}/>
            {milestones.length > 0 && (
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                        {(provided, snapshot) => (
                            <CrudContainer
                                isDraggingOver={snapshot.isDraggingOver}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {milestones.map((milestone, index) => (
                                    <Draggable key={milestone.id} draggableId={milestone.id.toString()} index={index}>
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
                                                        text={milestone.name}
                                                        setEdit={() => {
                                                            setEditingMilestone(milestone)
                                                        }}
                                                        onDelete={() => {
                                                            deleteMilestone(milestone)
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
            ) || (
                <p className="text-gray-600 dark:text-gray-400">
                    No milestones for this experience. Add one with the form below.
                </p>
            )}
            <CrudMilestone
                milestone={editingMilestone}
                experience_id={experience.id}
                resetEditingMilestone={resetEditingMilestone}
                className="mt-4"
            />
        </section>
    );
}

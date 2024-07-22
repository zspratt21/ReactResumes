import CrudExperience from "@/Pages/Resume/Partials/Experience/CrudExperience";
import {router, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Experience} from "@/types/resume";
import {useEffect, useState} from "react";
import CrudHeading from "@/Pages/Resume/Partials/Crud/CrudHeading";
import CrudContainer from "@/Pages/Resume/Partials/Crud/CrudContainer";
import CrudWrapper from "@/Pages/Resume/Partials/Crud/CrudWrapper";
import CrudView from "@/Pages/Resume/Partials/Crud/CrudView";

export default function ManageExperiences({className = '', onCompletionChange}: {className?: string, onCompletionChange: (isComplete: boolean) => void}) {
    const user = usePage<PageProps>().props.auth.user;
    const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

    useEffect(() => {
        onCompletionChange(user.experiences?.length > 0);
        const newExperience = user.experiences?.find((experience) => experience.id === editingExperience?.id);
        setEditingExperience(newExperience || null);
    }, [user.experiences]);

    const resetEditingExperience = () => {
        setEditingExperience(null);
    };

    const deleteExperience = (experience: Experience) => {
        if (window.confirm('Are you sure you want to delete this experience?')) {
            if (experience.id === editingExperience?.id) {
                resetEditingExperience();
            }
            router.delete(
                route('experience.delete', {id: experience.id}),
                {
                    preserveScroll: true
                }
            );
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Experience</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Add, modify, or remove experiences from your profile.
                </p>
            </header>

            <CrudHeading text="Current Experiences" empty={user.experiences?.length < 1}/>
            {user.experiences?.length > 0 && (
                <CrudContainer>
                    {user.experiences.map((experience, index) => (
                        <CrudWrapper key={index}>
                            <CrudView
                                className="flex-1"
                                text={experience.title}
                                setEdit={() => {
                                    setEditingExperience(experience)
                                }}
                                onDelete={() => {
                                    deleteExperience(experience)
                                }}
                            />
                        </CrudWrapper>
                    ))}
                </CrudContainer>
            ) || (
                <p className="text-gray-600 dark:text-gray-400">
                    You have no experiences. Fill out the form below to add one.
                </p>
            )}

            <CrudExperience
                experience={editingExperience}
                resetEditingExperience={resetEditingExperience}
                className="mt-4"
            />
        </section>
    );
}

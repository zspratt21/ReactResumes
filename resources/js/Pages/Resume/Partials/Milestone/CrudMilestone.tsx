import {Milestone} from "@/types/resume";
import {useForm} from "@inertiajs/react";
import React, {FormEventHandler, useEffect} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SaveButton from "@/Components/SaveButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function CrudMilestone({className = '', milestone, experience_id, resetEditingMilestone}: {className?: string, milestone: Milestone | null, experience_id: number, resetEditingMilestone: () => void}) {
    const generateData = (milestone: Milestone | null) => ({
        id: milestone?.id || 0,
        experience_id: experience_id,
        name: milestone?.name || '',
        description: milestone?.description || '',
        _method: 'patch',
    });
    const { data, setData, post, delete: deleteRequest, errors, processing, recentlySuccessful} = useForm(generateData(milestone));

    useEffect(() => {
        setData(generateData(milestone));
    }, [milestone]);

    useEffect(() => {
        setData(generateData(null));
    }, [experience_id]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route('milestone.modify'),
            {
                preserveScroll: true,
                onSuccess: (Page) => {
                    if (!milestone) {
                        setData(generateData(null));
                    }
                },
            }
        );
    };

    const addNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetEditingMilestone();
    }

    return (
        <div className={className}>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1"/>
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description"/>

                    <TextAreaInput
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                    />

                    <InputError message={errors.description} className="mt-1"/>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                    {milestone && (
                        <>
                            <PrimaryButton onClick={addNew}>Add New Milestone</PrimaryButton>
                            <SaveButton disabled={processing}>Save</SaveButton>
                        </>
                    ) || (
                        <PrimaryButton disabled={processing}>Add New Milestone</PrimaryButton>
                    )}
                </div>
            </form>
        </div>
    );
}

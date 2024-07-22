import {Skill} from "@/types/resume";
import {useForm} from "@inertiajs/react";
import React, {FormEventHandler, useEffect, useRef, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SaveButton from "@/Components/SaveButton";
import PrimaryButton from "@/Components/PrimaryButton";
import ImageInput from "@/Components/ImageInput";

export default function CrudSkill({className = '', skill, resetEditingSkill}: {className?: string, skill: Skill | null, resetEditingSkill: () => void}) {
    const generateData = (skill: Skill | null) => ({
        id: skill?.id || 0,
        name: skill?.name || '',
        url: skill?.url || '',
        file_icon: null as File | null,
        remove_icon: 0 as 1 | 0,
        _method: 'patch',
    });
    const { data, setData, post, delete: deleteRequest, errors, processing, recentlySuccessful} = useForm(generateData(skill));

    const imageInputRef = useRef<HTMLInputElement>(null);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route('skill.modify'),
            {
                preserveScroll: true,
                onSuccess: (Page) => {
                    if (!skill) {
                        setData(generateData(null));
                    }
                },
            }
        );
    };

    const addNew = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        resetEditingSkill();
    }

    useEffect(() => {
        setData(generateData(skill));
    }, [skill]);

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

                <div className="mt-2">
                    <InputLabel htmlFor="url" value="Url/Website"/>

                    <TextInput
                        className="mt-1 block w-full"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                        required
                    />

                    <InputError message={errors.url} className="mt-1"/>
                </div>

                <div className="mt-2">
                    <InputLabel htmlFor="file_icon" value="Icon"/>

                    <ImageInput
                        ref={imageInputRef}
                        className="mt-1 block w-full"
                        initialPhoto={skill?.icon || null}
                        current_file={data.file_icon}
                        setPhotoData={(photo: File | null) => setData('file_icon', photo)}
                        setRemoveData={(value: 0 | 1) => setData('remove_icon', value)}
                        previewAlt="skill icon"
                        previewClassName="h-36 w-auto"
                        removed={data.remove_icon}
                    />

                    <InputError message={errors.file_icon} className="mt-1"/>
                </div>

                <div className="flex justify-end mt-4 space-x-2">
                    {skill && (
                        <>
                            <PrimaryButton onClick={addNew}>Add New Skill</PrimaryButton>
                            <SaveButton disabled={processing}>Save</SaveButton>
                        </>
                    ) || (
                        <PrimaryButton disabled={processing}>Add New Skill</PrimaryButton>
                    )}
                </div>
            </form>
        </div>
    );
}

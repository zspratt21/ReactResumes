import {useForm} from "@inertiajs/react";
import {Skill} from "@/types/resume";
import {FormEventHandler, useRef, useState} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import SaveButton from "@/Components/SaveButton";
import CompactImageInput from "@/Components/CompactImageInput";

export default function CrudSkill({className = '', skill, onDelete}: {className: string, skill: Skill|null, onDelete: () => void}) {
    const { data, setData, post, delete: deleteRequest, errors, processing, recentlySuccessful} = useForm({
        id: skill?.id || 0,
        name: skill?.name || '',
        url: skill?.url || '',
        file_icon: null as File | null,
        remove_icon: 0 as 1 | 0,
        _method: 'patch',
    });
    const [refreshKey, setRefreshKey] = useState(0);
    const imageInputRef = useRef(null);
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route('skill.modify'),
            {
                preserveScroll: true,
                onSuccess: (Page) => {
                    if (data.id === 0) {
                        onDelete();
                    }
                    setRefreshKey(refreshKey + 1);
                },
            }
        );
    };
    const handleDelete = () => {
        if(data.id == 0) {
            onDelete();
        }
        else {
            deleteRequest(
                route('skill.delete', {data: {id: data.id}}),
                {
                    preserveScroll: true,
                }
            );
        }
    };
    return(
        <section className={className}>
            <form onSubmit={submit} key={refreshKey}>
                <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <div className="flex-1">
                        <InputLabel htmlFor="name" value="Name"/>

                        <TextInput
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="&#xf0ad;"
                            required
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.name}/>
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="url" value="Website/Link"/>

                        <TextInput
                            className="mt-1 block w-full"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                            placeholder="&#xf0c1;"
                            isFocused
                        />

                        <InputError className="mt-2" message={errors.url}/>
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="file_icon" value="Icon"/>

                        <CompactImageInput
                            ref={imageInputRef}
                            id="file_icon"
                            className="mt-1 block w-full min-h-10"
                            onChange={(e) => setData('file_icon', e.target.files?.[0] || data.file_icon)}
                            initialPhoto={skill?.icon || null}
                            setPhotoData={(photo: File | null) => setData('file_icon', photo)}
                            setRemoveData={(value: 0 | 1) => {
                                if (value == 1) {
                                    setData({...data, remove_icon: value, file_icon: null});
                                } else {
                                    setData({...data, remove_icon: value});
                                }
                            }}
                        />

                        <InputError className="mt-2" message={errors.file_icon}/>
                    </div>

                    <div className="flex items-end space-x-2">
                        <SaveButton className="min-h-10" disabled={processing}/>
                        <PrimaryButton className="min-h-10" onClick={(e) => {e.preventDefault(); handleDelete()}}>&#xf1f8; Delete</PrimaryButton>
                    </div>
                </div>
            </form>
        </section>
    );
}

import { useForm, usePage } from '@inertiajs/react';
import {
    FormEventHandler, useEffect, useRef, useState,
} from 'react';
import { Transition } from '@headlessui/react';
import { PageProps } from '@/types';
import SaveButton from '@/Components/SaveButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import NumberInput from '@/Components/NumberInput';
import TextAreaInput from '@/Components/TextAreaInput';
import ImageInput from '@/Components/ImageInput';

export default function UpdateResumeProfile({ className = '', onCompletionChange }: {className?: string, onCompletionChange: (isComplete: boolean) => void}) {
    const { user } = usePage<PageProps>().props.auth;
    const {
        data, setData, post, errors, processing, recentlySuccessful,
    } = useForm({
        address: user.resume_profile?.address || '',
        mobile: user.resume_profile?.mobile || '',
        linkedin: user.resume_profile?.linkedin || '',
        github: user.resume_profile?.github || '',
        twitter: user.resume_profile?.twitter || '',
        instagram: user.resume_profile?.instagram || '',
        salesforce: user.resume_profile?.salesforce || '',
        introduction: user.resume_profile?.introduction || '',
        file_cover_photo: null as File | null,
        remove_cover_photo: 0 as 1 | 0,
        _method: 'patch',
    });
    const imageInputRef = useRef(null);
    const checkValidResumeProfile = () => {
        onCompletionChange(!!user.resume_profile);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(
            route('resume-profile.update'),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setData({...data, file_cover_photo: null, remove_cover_photo: 0});
                },
            },
        );
    };

    useEffect(checkValidResumeProfile, [user.resume_profile]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Resume Information</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's resume profile information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="address" value="Address" />

                    <TextInput
                        id="address"
                        className="mt-1 block w-full"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        placeholder="&#xf3c5;"
                        required
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="mobile" value="Mobile" />

                    <NumberInput
                        id="mobile"
                        className="mt-1 block w-full"
                        value={data.mobile}
                        onChange={(e) => setData('mobile', e.target.value)}
                        placeholder="&#xf2a0;"
                    />

                    <InputError className="mt-2" message={errors.address} />
                </div>

                <div>
                    <InputLabel htmlFor="linkedin" value="LinkedIn" />

                    <TextInput
                        id="linkedin"
                        className="mt-1 block w-full"
                        value={data.linkedin}
                        onChange={(e) => setData('linkedin', e.target.value)}
                        placeholder="&#xf08c;"
                    />

                    <InputError className="mt-2" message={errors.linkedin} />
                </div>

                <div>
                    <InputLabel htmlFor="github" value="GitHub" />

                    <TextInput
                        id="github"
                        className="mt-1 block w-full"
                        value={data.github}
                        onChange={(e) => setData('github', e.target.value)}
                        placeholder="&#xf09b;"
                    />

                    <InputError className="mt-2" message={errors.github} />
                </div>

                <div>
                    <InputLabel htmlFor="twitter" value="Twitter" />

                    <TextInput
                        id="twitter"
                        className="mt-1 block w-full"
                        value={data.twitter}
                        onChange={(e) => setData('twitter', e.target.value)}
                        placeholder="&#xf099;"
                    />

                    <InputError className="mt-2" message={errors.twitter} />
                </div>

                <div>
                    <InputLabel htmlFor="instagram" value="Instagram" />

                    <TextInput
                        id="instagram"
                        className="mt-1 block w-full"
                        value={data.instagram}
                        onChange={(e) => setData('instagram', e.target.value)}
                        placeholder="&#xf16d;"
                    />

                    <InputError className="mt-2" message={errors.instagram} />
                </div>

                <div>
                    <InputLabel htmlFor="salesforce" value="Salesforce" />

                    <TextInput
                        id="salesforce"
                        className="mt-1 block w-full"
                        value={data.salesforce}
                        onChange={(e) => setData('salesforce', e.target.value)}
                        placeholder="&#xf83b;"
                    />

                    <InputError className="mt-2" message={errors.salesforce} />
                </div>

                <div>
                    <InputLabel htmlFor="introduction" value="Introduction" />

                    <TextAreaInput
                        id="introduction"
                        className="mt-1 block w-full"
                        value={data.introduction}
                        onChange={(e) => setData('introduction', e.target.value)}
                        placeholder="&#xf0f3;"
                        rows={10}
                        required
                    />

                    <InputError className="mt-2" message={errors.introduction} />
                </div>

                <div>
                    <InputLabel htmlFor="file_cover_photo" value="Cover Photo" />

                    <ImageInput
                        ref={imageInputRef}
                        className="mt-1 block w-full"
                        initialPhoto={user.resume_profile?.cover_photo}
                        current_file={data.file_cover_photo}
                        setPhotoData={(file: File | null) => setData('file_cover_photo', file)}
                        setRemoveData={(value: 0 | 1) => setData('remove_cover_photo', value)}
                        previewAlt="Cover Photo"
                        previewClassName="min-h-36 max-h-96 w-auto"
                        removed={data.remove_cover_photo}
                    />

                    <InputError className="mt-2" message={errors.file_cover_photo} />
                </div>

                <div className="flex items-center gap-4">
                    <SaveButton disabled={processing} />

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}

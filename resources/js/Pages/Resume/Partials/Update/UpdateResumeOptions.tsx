import {useForm, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {FormEventHandler, useEffect} from "react";
import SaveButton from "@/Components/SaveButton";
import {Transition} from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function UpdateResumeOptions({className = '', onCompletionChange}: {className?: string, onCompletionChange: (isComplete: boolean) => void}) {
    const user = usePage<PageProps>().props.auth.user;
    const {
        data, setData, post, errors, processing, recentlySuccessful,
    } = useForm({
        font: user.resume_options?.font || 'figtree',
        color_scheme: user.resume_options?.color_scheme || 'light',
        layout: user.resume_options?.layout || 'Modern',
        _method: 'patch',
    });
    const checkValidResumeOptions = () => {
        onCompletionChange(!!user.resume_options);
    };

    useEffect(checkValidResumeOptions, [user.resume_options]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log('data', data);
        post(
            route('resume-options.update'),
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Resume Options</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your resume options.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">

                <div className="flex flex-col sm:flex-row sm:space-x-2">
                    <div className="flex-1">
                        <InputLabel htmlFor="font" value="Font"/>

                        <SelectInput
                            id="font"
                            className="mt-1 block w-full"
                            value={data.font}
                            required
                            onChange={(e) => setData('font', e.target.value)}
                            options={{
                                'font-sans': 'Figtree',
                                'font-roboto': 'Roboto',
                                'font-playfair': 'Playfair Display',
                            }}
                        />

                        <InputError message={errors.font} className="mt-1"/>
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="color_scheme" value="Color Scheme"/>

                        <SelectInput
                            id="color_scheme"
                            className="mt-1 block w-full"
                            value={data.color_scheme}
                            required
                            onChange={(e) => setData('color_scheme', e.target.value)}
                            options={{
                                light: 'Light',
                                dark: 'Dark',
                            }}
                        />

                        <InputError message={errors.color_scheme} className="mt-1"/>
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="layout" value="Layout"/>

                        <SelectInput
                            id="layout"
                            className="mt-1 block w-full"
                            value={data.layout}
                            required
                            onChange={(e) => setData('layout', e.target.value)}
                            options={{
                                Modern: 'Modern',
                            }}
                        />

                        <InputError message={errors.layout} className="mt-1"/>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <SaveButton disabled={processing}/>

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

import { useForm } from '@inertiajs/react';
import React, {
  FormEventHandler, useEffect, useRef,
} from 'react';
import { Experience } from '@/types/resume';
import InputError from '@/Components/InputError';
import SaveButton from '@/Components/SaveButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import TextAreaInput from '@/Components/TextAreaInput';
import ImageInput from '@/Components/ImageInput';
import SelectInput from '@/Components/SelectInput';
import ManageMilestones from '@/Pages/Resume/Partials/Milestone/ManageMilestones';
import PrimaryButton from '@/Components/PrimaryButton';

export default function CrudExperience({ className = '', experience, resetEditingExperience }: {className?: string, experience: Experience|null, resetEditingExperience: () => void}) {
  const generateData = (experience: Experience | null) => ({
    id: experience?.id || 0,
    title: experience?.title || '',
    entity: experience?.entity || '',
    type: experience?.type || 'experience',
    file_image: null as File | null,
    remove_image: 0 as 1 | 0,
    start_date: experience?.start_date || '',
    end_date: experience?.end_date || '',
    description: experience?.description || '',
    _method: 'patch',
  });

  const { data, setData, post, errors, processing, } = useForm(generateData(experience));

  const imageInputRef = useRef(null);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(
      route('experience.modify'),
      {
        preserveScroll: true,
        onSuccess: () => {
          if (!experience) {
            setData(generateData(null));
          }
        },
      },
    );
  };

  const addNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    resetEditingExperience();
  };

    useEffect(() => {
        setData(generateData(experience));
    }, [experience]);

  return (
    <section className={className}>
      <form onSubmit={submit}>
        <div className="flex flex-col sm:flex-row sm:space-x-2">
          <div className="flex-1">
            <InputLabel htmlFor="title" value="Title" />

            <TextInput
              className="mt-1 block w-full"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              required
            />

            <InputError message={errors.title} className="mt-1" />
          </div>

          <div className="flex-1">
            <InputLabel htmlFor="entity" value="Entity" />

            <TextInput
              className="mt-1 block w-full"
              value={data.entity}
              onChange={(e) => setData('entity', e.target.value)}
              required
            />

            <InputError message={errors.entity} className="mt-1" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-2 mt-1">
          <div className="flex-1">
            <InputLabel htmlFor="start_date" value="Start Date" />

            <TextInput
              className="mt-1 block w-full"
              value={data.start_date}
              type="date"
              onChange={(e) => setData('start_date', e.target.value)}
              required
            />

            <InputError message={errors.start_date} className="mt-1" />
          </div>

          <div className="flex-1">
            <InputLabel htmlFor="end_date" value="End Date" />

            <TextInput
              className="mt-1 block w-full"
              value={data.end_date}
              type="date"
              onChange={(e) => setData('end_date', e.target.value)}
            />

            <InputError message={errors.end_date} className="mt-1" />
          </div>

          <div className="flex-1">
            <InputLabel htmlFor="type" value="Type" />

            <SelectInput
              className="mt-1 block w-full"
              options={{
                experience: 'Employment',
                education: 'Education',
              }}
              value={data.type}
              onChange={(e) => setData('type', e.target.value)}
            />
          </div>
        </div>

        <div className="mt-1">
          <InputLabel htmlFor="description" value="Description" />

          <TextAreaInput
            className="mt-1 block w-full"
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            required
          />

          <InputError message={errors.description} className="mt-1" />
        </div>

        <div className="mt-1">
          <InputLabel htmlFor="file_image" value="Image" />

          <ImageInput
            ref={imageInputRef}
            className="mt-1 block w-full"
            initialPhoto={experience?.image || null}
            current_file={data.file_image}
            setPhotoData={(photo: File | null) => setData('file_image', photo)}
            setRemoveData={(value: 0 | 1) => setData('remove_image', value)}
            previewAlt="experience image"
            previewClassName="h-36 w-auto"
            removed={data.remove_image}
          />

          <InputError message={errors.file_image} className="mt-1" />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          {experience && (
            <>
              <PrimaryButton onClick={addNew}>Add New Experience</PrimaryButton>
              <SaveButton disabled={processing}>Save</SaveButton>
            </>
          ) || (
            <PrimaryButton disabled={processing}>Add New Experience</PrimaryButton>
          )}
        </div>
      </form>
      {experience && <ManageMilestones experience={experience} className="mt-4" />}
    </section>
  );
}

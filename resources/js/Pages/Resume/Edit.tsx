import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderHeading from '@/Components/HeaderHeading';
import { PageProps } from '@/types';
import UpdateResumeProfile from '@/Pages/Resume/Partials/Update/UpdateResumeProfile';
import UpdateResumeOptions from '@/Pages/Resume/Partials/Update/UpdateResumeOptions';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import ManageSkills from '@/Pages/Resume/Partials/Skill/ManageSkills';
import ManageExperiences from '@/Pages/Resume/Partials/Experience/ManageExperiences';
import PrimaryButton from '@/Components/PrimaryButton';
import StepHeader from '@/Pages/Resume/Partials/Form/StepHeader';
import SecondaryButton from "@/Components/SecondaryButton";
import AppHead from "@/Components/AppHead";
import DynamicIframe from "@/Components/DynamicIframe";

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const { user } = usePage<PageProps>().props.auth;
    const [resumeProfileCompleted, setResumeProfileCompleted] = useState(user.resume_profile?.address != null);
    const [resumeOptionsCompleted, setResumeOptionsCompleted] = useState(user.resume_options != null);
    const [resumeSkillsCompleted, setResumeSkillsCompleted] = useState(user.skills.length > 0);
    const [resumeExperienceCompleted, setResumeExperienceCompleted] = useState(user.experiences.length > 0);
    const [resumePreviewGenerated, setResumePreviewGenerated] = useState(false);
    const handleResumeProfileCompletion = (isComplete: boolean) => {
        setResumeProfileCompleted(isComplete);
    };
    const handleResumeOptionsCompletion = (isComplete: boolean) => {
        setResumeOptionsCompleted(isComplete);
    };

    const handleResumeSkillsCompletion = (isComplete: boolean) => {
        setResumeSkillsCompleted(isComplete);
    };

    const handleResumeExperienceCompletion = (isComplete: boolean) => {
        setResumeExperienceCompleted(isComplete);
    };

    const handleResumePreviewGenerated = (isComplete: boolean) => {
        setResumePreviewGenerated(isComplete);
    };

    const [visibleStep, setVisibleStep] = useState(1);

    useEffect(() => {
        console.log(visibleStep);
    }, [visibleStep]);

    const [canProceed, setCanProceed] = useState(false);

    useEffect(() => {
        switch (visibleStep) {
            case 1:
                setCanProceed(!!user.email_verified_at);
                break;
            case 2:
                setCanProceed(resumeProfileCompleted);
                break;
            case 3:
                setCanProceed(resumeSkillsCompleted);
                break;
            case 4:
                setCanProceed(resumeExperienceCompleted);
                break;
            case 5:
                setCanProceed(resumeOptionsCompleted);
                break;
            case 6:
                setCanProceed(resumePreviewGenerated);
                break;
            default:
                setCanProceed(false);
        }
    }, [visibleStep, resumeProfileCompleted, resumeSkillsCompleted, resumeExperienceCompleted, resumeOptionsCompleted, resumePreviewGenerated, mustVerifyEmail]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderHeading text="Create Resume" />}
        >
            <AppHead title="Create your resume" />
            <div className="h-full py-12 flex-1 flex flex-col">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 min-h-full flex-grow w-full flex">
                    <div className="w-1/4 sm:rounded-l-lg text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700">
                        <StepHeader
                            visible={() => visibleStep === 1}
                            completed
                            setVisibility={() => setVisibleStep(1)}
                            disabled={false}
                        >
                            Setup Profile
                        </StepHeader>
                        <StepHeader
                            visible={() => visibleStep === 2}
                            completed={resumeProfileCompleted}
                            setVisibility={() => setVisibleStep(2)}
                            disabled={false}
                        >
                            Main Details
                        </StepHeader>
                        <StepHeader
                            visible={() => visibleStep === 3}
                            completed={resumeSkillsCompleted}
                            setVisibility={() => setVisibleStep(3)}
                            disabled={!resumeProfileCompleted}
                        >
                            Add Skills
                        </StepHeader>
                        <StepHeader
                            visible={() => visibleStep === 4}
                            completed={resumeExperienceCompleted}
                            setVisibility={() => setVisibleStep(4)}
                            disabled={!resumeSkillsCompleted}
                        >
                            Add Experience
                        </StepHeader>
                        <StepHeader
                            visible={() => visibleStep === 5}
                            completed={resumeOptionsCompleted}
                            setVisibility={() => setVisibleStep(5)}
                            disabled={!resumeExperienceCompleted}
                        >
                            Choose Style
                        </StepHeader>
                        <StepHeader
                            visible={() => visibleStep === 6}
                            completed={resumePreviewGenerated}
                            setVisibility={() => setVisibleStep(6)}
                            disabled={!resumeOptionsCompleted}
                        >
                            Preview
                        </StepHeader>
                    </div>
                    <div className="w-3/4 sm:rounded-r-lg">
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-r-lg min-h-full p-4 sm:p-8 flex flex-col">
                            <div className="flex-1">
                                <div className="">
                                    {visibleStep === 1 && (
                                        <UpdateProfileInformationForm
                                            mustVerifyEmail={mustVerifyEmail}
                                            status={status}
                                            className="max-w-xl"
                                        />
                                    )}
                                    {visibleStep === 2 && (
                                        <UpdateResumeProfile
                                            className="max-w-xl"
                                            onCompletionChange={handleResumeProfileCompletion}
                                        />
                                    )}
                                    {visibleStep === 3 && (
                                        <ManageSkills className="max-w-full" onCompletionChange={handleResumeSkillsCompletion}/>
                                    )}
                                    {visibleStep === 4 && (
                                        <ManageExperiences
                                            onCompletionChange={handleResumeExperienceCompletion}
                                        />
                                    )}
                                    {visibleStep === 5 && (
                                        <UpdateResumeOptions
                                            className="max-w-xl"
                                            onCompletionChange={handleResumeOptionsCompletion}
                                        />
                                    )}
                                    {visibleStep === 6 && (
                                        // w-[8.27in]
                                        <div className="flex flex-col">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Preview</h2>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                        Review your resume before downloading it as a PDF.
                                                    </p>
                                                </div>
                                            </div>
                                            <DynamicIframe
                                                src={route('resume.preview')}
                                                onLoad={() => handleResumePreviewGenerated(true)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex space-x-2 mt-2">
                                    {visibleStep > 1 && (
                                        <SecondaryButton onClick={() => {setVisibleStep(visibleStep - 1)}} className="p-2">Previous Step</SecondaryButton>
                                    )}
                                    {visibleStep < 6 && (
                                        <SecondaryButton onClick={() => {setVisibleStep(visibleStep + 1)} } className="p-2" disabled={!canProceed}>Next Step</SecondaryButton>
                                    )}
                                </div>
                                {(resumePreviewGenerated && visibleStep == 6) && (
                                    <PrimaryButton
                                        className="my-2"
                                        onClick={() => window.open(route('resume.print'), '_blank')}
                                    >
                                        &#xf091; Generate PDF!
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

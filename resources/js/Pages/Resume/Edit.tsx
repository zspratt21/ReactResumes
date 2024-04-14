import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderHeading from "@/Components/HeaderHeading";
import FormSection from "@/Components/FormSection";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import UpdateResumeProfile from "@/Pages/Profile/Partials/UpdateResumeProfile";
import UpdateResumeOptions from "@/Pages/Profile/Partials/UpdateResumeOptions";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm";
import { useState } from "react";
import ManageSkills from "@/Pages/Resume/Partials/Skill/ManageSkills";
import ManageExperiences from "@/Pages/Resume/Partials/Experience/ManageExperiences";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const [resumeProfileCompleted, setResumeProfileCompleted] = useState(false);
    const [resumeOptionsCompleted, setResumeOptionsCompleted] = useState(false);
    const [resumeSkillsCompleted, setResumeSkillsCompleted] = useState(false);
    const [resumeExperienceCompleted, setResumeExperienceCompleted] = useState(false);
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

    // @todo style page as a step by step process where only 1 step is visible at a time with a list on the side.
    // @todo visibility based on listed components and if current open step is that component.

    let visibleStep = 1;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderHeading text="Create Resume" />}
        >
            <Head title="Create your resume" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <FormSection title="Step 1" visible={true} completed={true}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </FormSection>
                    <FormSection title="Step 2" visible={false} completed={resumeProfileCompleted}>
                        <UpdateResumeProfile
                            className="max-w-xl"
                            onCompletionChange={handleResumeProfileCompletion}
                        />
                    </FormSection>
                    <FormSection title="Step 3" visible={false} completed={resumeOptionsCompleted}>
                        <UpdateResumeOptions
                            className="max-w-xl"
                            onCompletionChange={handleResumeOptionsCompletion}
                        />
                    </FormSection>
                    <FormSection title="Step 4" visible={false} completed={resumeSkillsCompleted}>
                        <ManageSkills className="max-w-full" onCompletionChange={handleResumeSkillsCompletion}/>
                    </FormSection>
                    <FormSection title={"Step 5"} visible={false} completed={resumeExperienceCompleted}>
                        <ManageExperiences onCompletionChange={handleResumeExperienceCompletion} />
                    </FormSection>
                    <FormSection title={"Step 6"} visible={false} completed={resumePreviewGenerated}>
                            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Preview</h2>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                Review your resume before downloading it as a PDF.
                            </p>
                            {/*    @todo iFrame here    */}
                            <iframe className="w-full h-96 p-6" src="/resume/preview"></iframe>
                    </FormSection>
                    {resumePreviewGenerated && (
                        <PrimaryButton onClick={() => {}}>&#xf091; Generate PDF!</PrimaryButton>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

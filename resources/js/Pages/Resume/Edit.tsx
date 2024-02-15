// @todo Stage 1: Update resume options
// @todo Stage 2: Update resume profile
// @todo Stage 3: Update resume skills
// @todo Stage 4: Update resume experiences (including milestones)
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import HeaderHeading from "@/Components/HeaderHeading";
import {Head} from "@inertiajs/react";
import {PageProps} from "@/types";

export default function Edit({auth}: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderHeading text="Create Resume"/>}
        >
            <Head title="Create your resume" />

            <div className="py-12">
            </div>
        </AuthenticatedLayout>
    );
}

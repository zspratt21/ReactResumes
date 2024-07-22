import {
    Experience, ResumeOptions, ResumeProfile, Skill,
} from '@/types/resume';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    two_factor_enabled: 1 | 0;
    resume_profile: ResumeProfile;
    resume_options: ResumeOptions;
    skills: Skill[];
    experiences: Experience[];
    employment_experiences: Experience[];
    educational_experiences: Experience[];
    project_experiences: Experience[];
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

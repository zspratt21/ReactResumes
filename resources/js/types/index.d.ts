export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    avatar: string;
    two_factor_enabled: 1 | 0;
    resume_profile: ResumeProfile;
    resume_options: ResumeOptions;
}

export interface ResumeProfile {
    id: number;
    user_id: number;
    address: string;
    mobile: string;
    linkedin: string|null;
    github: string|null;
    twitter: string|null;
    instagram: string|null;
    salesforce: string|null;
    cover_photo: string|null;
    introduction: string;
    created_at: string;
    updated_at: string;
}

export interface ResumeOptions {
    id: number;
    user_id: number;
    font: string;
    color_scheme: string;
    layout: string;
    created_at: string;
    updated_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

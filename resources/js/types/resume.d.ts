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

export interface Skill {}

export interface Experience {}

export interface Milestone {}

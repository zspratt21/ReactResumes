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

export interface Skill {
    id: number;
    name: string;
    priority: number;
    icon: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface Experience {
    id: number;
    user_id: number;
    title: string;
    entity: string;
    image: string;
    type: string;
    start_date: string;
    end_date: string;
    description: string;
    milestones: Milestone[];
    created_at: string;
    updated_at: string;
}

export interface ExperienceGroups {
    [key: string]: Experience[];
}

export interface Milestone {
    id: number;
    experience_id: number;
    priority: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

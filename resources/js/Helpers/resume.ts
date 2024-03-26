import {Experience, ExperienceGroups} from "@/types/resume";

export function groupExperiencesByType(experiences: Experience[]): ExperienceGroups {
    return experiences.reduce((groups: ExperienceGroups, experience) => ({
            ...groups,
            [experience.type]: [...(groups[experience.type] ?? []), experience]
    }), {});
}

export function experienceDate(value: string | number | Date){
    const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short'};
    return new Date(value).toLocaleDateString('default', dateOptions);
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

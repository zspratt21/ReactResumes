import {User} from "@/types";
import {useRef} from "react";
import Main from "@/Pages/Print/Resume/Main";
import {ExperienceGroups, Skill} from "@/types/resume";
import {capitalizeFirstLetter, experienceDate, groupExperiencesByType} from "@/Helpers/resume";
import FormatDescription from "@/Pages/Print/Resume/Partials/FormatDescription";
import Mobile from "@/Pages/Print/Resume/Partials/Mobile";
import Address from "@/Pages/Print/Resume/Partials/Address";
import Email from "@/Pages/Print/Resume/Partials/Email";

export default function Modern({user}: {user: User}) {
    const coverPhoto = user.resume_profile.cover_photo;
    const coverPhotoContainerRef = useRef<HTMLDivElement>(null);
    const nameLinksContainerRef = useRef<HTMLDivElement>(null);
    const profilePhotoContainerRef = useRef<HTMLDivElement>(null);
    const experiencesByType: ExperienceGroups = groupExperiencesByType(user.experiences);

    return (
        <Main
            user={user}
            coverPhoto={coverPhoto}
            coverPhotoContainerRef={coverPhotoContainerRef}
            nameLinksContainerRef={nameLinksContainerRef}
            profilePhotoContainerRef={profilePhotoContainerRef}
        >
            <div ref={coverPhotoContainerRef} className={coverPhoto ? 'p-4 hasCoverPhoto' : 'p-4'}>
                <div
                    className="pt-4 pb-2 text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hasCoverPhoto:text-white hasCoverPhoto:bg-gray-800/60 hasCoverPhoto:dark:bg-gray-800/60 rounded-lg">
                    <div
                        className="flex justify-between pb-1 mx-4 border-b border-gray-900 hasCoverPhoto:border-white dark:border-white hasCoverPhoto:dark:border-white">
                        <div ref={profilePhotoContainerRef}
                             className={user.avatar ? 'min-h-[118.75px] min-w-[118.75px] rounded-full border-2 border-gray-900 dark:border-white hasCoverPhoto:border-white' : 'flex-1'}>
                            <h1 className={`text-4xl font-bold ${user.avatar && 'hidden'}`}>{user.name}</h1>
                        </div>
                        <div className="flex flex-col text-right" ref={nameLinksContainerRef}>
                            <h1 className={`text-4xl font-bold ${!user.avatar && 'hidden'}`}>{user.name}</h1>
                            <div
                                className="flex flex-col items-end font-bold">
                                {user.resume_profile.linkedin && (<a href={user.resume_profile.linkedin}
                                                                     className="w-fit">{user.resume_profile.linkedin}
                                    <i className="fab fa-linkedin-in text-[#0a66c2] text-[22px] pl-2"/></a>)}
                                {user.resume_profile.github && (<a href={user.resume_profile.github}
                                                                   className="w-fit">{user.resume_profile.github}
                                    <i className="fab fa-github text-black text-[22px] pl-2"/></a>)}
                                {user.resume_profile.twitter && (<a href={user.resume_profile.twitter}
                                                                    className="w-fit">{user.resume_profile.twitter}
                                    <i className="fab fa-twitter text-[#1da1f2] text-[22px] pl-2"/></a>)}
                                {user.resume_profile.instagram && (<a href={user.resume_profile.instagram}
                                                                      className="w-fit">{user.resume_profile.instagram}
                                    <i className="fab fa-instagram text-[#c32aa3] text-[22px] pl-2"/></a>)}
                                {user.resume_profile.salesforce && (<a href={user.resume_profile.salesforce}
                                                                       className="w-fit">{user.resume_profile.salesforce}
                                    <i className="fab fa-salesforce text-[#00a1e0] text-[22px] pl-2"/></a>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-1 px-4">
                        <div className="">
                            <h2 className="text-[30px] leading-[30px]">About Me</h2>
                        </div>
                        <div className="flex space-x-2">
                            <Address address={user.resume_profile.address}/>
                            <Mobile mobile={user.resume_profile.mobile}/>
                            <Email email={user.email}/>
                        </div>
                    </div>
                    <div className="pt-1 px-2">
                        <div className="p-2 rounded-lg bg-gray-300 hasCoverPhoto:bg-gray-900/20 dark:bg-gray-700 hasCoverPhoto:dark:bg-gray-900/20">
                            <p className="text-justify leading-tight">{user.resume_profile.introduction}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <h2 className="text-gray-900 dark:text-white text-[30px] text-center">&#xf0ad; Skills</h2>
                <div className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-500 rounded-lg">
                    <div className="flex flex-wrap justify-center">
                        {user.skills.map((skill: Skill, index: number) => {
                            return (
                                <a key={index} href={skill.url} className="text-[18px]">
                                    <div
                                        className="flex space-x-1 p-1 m-1 bg-gray-300 dark:bg-gray-700 rounded-lg">
                                        <b className="flex-1">{skill.name}</b>
                                        {!!skill.icon && (
                                            <img width="100%" className="max-h-[25px] max-w-fit" src={skill.icon} rel="preload" alt=""/>
                                        )}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            {Object.keys(experiencesByType).map(category => {
                let headerIconClasses = 'hidden';
                switch (category) {
                    case 'experience':
                        headerIconClasses = 'fa-solid fa-briefcase';
                        break;
                    case 'education':
                        headerIconClasses = 'fa-solid fa-graduation-cap';
                        break;
                }
                return (
                    <div key={category} className="px-4">
                        <h2 className="text-gray-900 dark:text-white text-[30px] text-center"><i className={headerIconClasses}></i> {capitalizeFirstLetter(category)}</h2>
                        <div className="bg-gray-200 text-gray-600 dark:text-gray-500 dark:bg-gray-800 rounded-lg">
                            {experiencesByType[category].map((experience, index) => {
                                const isLastItem = index === experiencesByType[category].length - 1;
                                const topClass = index === 0 ? " rounded-t-lg pt-4" : " pt-4";
                                const bottomClass = isLastItem && experience.milestones?.length === 0 ? " pb-4" : " pb-1";
                                const mainContainerClasses = "px-4" + topClass + bottomClass;
                                const milestoneContainerBottomClass = isLastItem ? " pb-4 rounded-b-lg" : " pb-1";
                                const milestoneContainerClasses = "bg-gray-300 dark:bg-gray-700 px-4" + milestoneContainerBottomClass;
                                return (
                                    <div key={index}>
                                        <div className={mainContainerClasses}>
                                            <div className="flex justify-between">
                                                {!!experience.image && (
                                                    <div>
                                                        <img className="max-h-[50px] h-auto w-full" src={experience.image} alt={experience.entity}/>
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h3 className="text-[20px] text-right"><i className="fa-solid fa-address-card"></i> {experience.title}</h3>
                                                </div>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <i className="">{experience.entity}</i>
                                                <span
                                                    className="text-right"><i className="fa-solid fa-calendar-days"></i> {experienceDate(experience.start_date)} - {experienceDate(experience.end_date)}</span>
                                            </div>
                                            <div>
                                                <p className="text-justify leading-tight"><FormatDescription text={experience.description}/></p>
                                            </div>
                                        </div>
                                        {experience.milestones?.length > 0 && (
                                            <div className={milestoneContainerClasses}>
                                                {experience.milestones.map((milestone, index) => (
                                                    <div key={index}>
                                                        <u>{milestone.name}</u>
                                                        <p className="text-justify leading-tight"><FormatDescription text={milestone.description}/></p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </Main>
    );
}

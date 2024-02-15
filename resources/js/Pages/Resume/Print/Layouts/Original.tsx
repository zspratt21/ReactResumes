import {User} from "@/types";
import {useRef} from "react";
import Main from "@/Pages/Resume/Print/Main";

export default function Original({user}: {user: User}) {
    const coverPhoto = user.resume_profile.cover_photo;
    const coverPhotoContainerRef = useRef<HTMLDivElement>(null);
    const nameLinksContainerRef = useRef<HTMLDivElement>(null);
    const profilePhotoContainerRef = useRef<HTMLDivElement>(null);
        return (
            <Main
                user={user}
                coverPhoto={coverPhoto}
                coverPhotoContainerRef={coverPhotoContainerRef}
                nameLinksContainerRef={nameLinksContainerRef}
                profilePhotoContainerRef={profilePhotoContainerRef}
            >
                <div ref={coverPhotoContainerRef} className={coverPhoto ? 'p-4 hasCoverPhoto' : 'p-4'}>
                    <div className="pt-4 pb-2 text-gray-900 bg-gray-200 dark:text-white dark:bg-gray-800 hasCoverPhoto:text-white hasCoverPhoto:bg-gray-800/60 hasCoverPhoto:dark:bg-gray-800/60 rounded-lg">
                        <div className="flex justify-between pb-1 mx-4 border-b border-gray-900 hasCoverPhoto:border-white dark:border-white hasCoverPhoto:dark:border-white">
                            <div ref={profilePhotoContainerRef} className="min-h-[118.75px] min-w-[118.75px] rounded-full border-2 border-gray-900 dark:border-white hasCoverPhoto:border-white"></div>
                            <div className="flex flex-col text-right" ref={nameLinksContainerRef}>
                                <h1 className="text-4xl font-bold">{user.name}</h1>
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
                                <a href={'https://www.google.com/maps/search/?api=1&query=' + user.resume_profile.address}>
                                    <h3><i
                                        className="fa-solid fa-location-dot text-[crimson]"></i> {user.resume_profile.address}
                                    </h3></a>
                                <a href={'tel:' + user.resume_profile.mobile}><h3><i
                                    className="fa-solid fa-phone-volume text-[limegreen]"></i> {user.resume_profile.mobile}
                                </h3></a>
                                <a href={'mailto:' + user.email}><h3><i
                                    className="fa-solid fa-envelope text-[sandybrown]"></i> {user.email}</h3>
                                </a>
                            </div>
                        </div>
                        <div className="pt-1 px-2">
                            <div id="intro-container"
                                 className="p-2 rounded-lg bg-gray-100 hasCoverPhoto:bg-gray-700/20 dark:bg-gray-700 hasCoverPhoto:dark:bg-gray-700/20">
                                <p className="text-justify leading-tight">{user.resume_profile.introduction}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Main>
        );
    }

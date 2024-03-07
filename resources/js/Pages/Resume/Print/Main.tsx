import {User} from "@/types";
import {PropsWithChildren, RefObject, useEffect, useRef} from "react";
import {dom, library} from "@fortawesome/fontawesome-svg-core";
import {faTailWind} from "@/Icons/Brands/Tailwind";
import {faPuppeteer} from "@/Icons/Brands/Puppeteer";
import {
    faGithub, faHtml5,
    faInstagram, faLaravel,
    faLinkedinIn, faReact,
    faSalesforce, faTwitter
} from "@fortawesome/free-brands-svg-icons";

export default function Main({user, coverPhoto, coverPhotoContainerRef, nameLinksContainerRef, profilePhotoContainerRef, children}: PropsWithChildren<{
    user: User,
    coverPhoto: string | null,
    coverPhotoContainerRef: RefObject<HTMLDivElement>,
    nameLinksContainerRef: RefObject<HTMLDivElement>,
    profilePhotoContainerRef: RefObject<HTMLDivElement>,
}>) {
    const containerRef = useRef<HTMLDivElement>(null);
    library.add(faTailWind, faPuppeteer, faHtml5, faReact, faLaravel, faLinkedinIn, faGithub, faTwitter, faInstagram, faSalesforce);
    dom.watch();
    useEffect(() => {
        if (coverPhoto) {
            if (coverPhotoContainerRef.current) {
                coverPhotoContainerRef.current.style.backgroundImage = `url(${encodeURI(coverPhoto)})`;
                coverPhotoContainerRef.current.style.backgroundSize = 'cover';
            }
        }
        if (nameLinksContainerRef.current && profilePhotoContainerRef.current) {
            profilePhotoContainerRef.current.style.height = nameLinksContainerRef.current.clientHeight + 'px';
            profilePhotoContainerRef.current.style.width = nameLinksContainerRef.current.clientHeight + 'px';
            profilePhotoContainerRef.current.style.backgroundImage = `url(${encodeURI(user.avatar)})`;
            profilePhotoContainerRef.current.style.backgroundSize = 'cover';
        }
        const height = containerRef?.current?.clientHeight;
        const viewportHeight = window.innerHeight;
        const heightInVH = height? (height / viewportHeight) * 100 : 0;
        let newHeightInVH = 100;
        while (heightInVH > newHeightInVH) {
            newHeightInVH = newHeightInVH + 100;
        }
        if (containerRef.current) {
            containerRef.current.style.height = newHeightInVH + 'vh';
        }
    });

    return (
        <div className={user.resume_options.color_scheme + ' min-h-fit bg-gray-100 dark:bg-gray-900 flex flex-col ' + user.resume_options.font} ref={containerRef}>
            <div className="w-full flex-1 bg-gray-100 dark:bg-gray-900">
                <div className="min-h-full w-full">
                    <main>
                        {children}
                    </main>
                </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-900 w-full">
                <footer className="pt-2 mx-auto w-fit">
                    <div className="flex space-x-2 pt-1 pb-1 border-t-2 border-gray-200 dark:border-gray-700">
                        <b className="text-gray-200 dark:text-gray-700 text-xl">&#xf1f9; {new Date().getFullYear()} {user.name}.
                            Dynamic CV | Made With</b>
                        <div className="flex space-x-3 bg-gray-200 dark:bg-gray-700 rounded-lg py-1 px-3">
                            <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
                                <i className="fab fa-html5 text-[#E44D26]"/>
                            </a>
                            <a href="https://tailwindcss.com/">
                                <i className="fab fa-tailwind text-[#38BDF8]"/>
                            </a>
                            <a href="https://react.dev/">
                                <i className="fab fa-react text-[#61DAFB]"/>
                            </a>
                            <a href="https://pptr.dev/">
                                <i className="fab fa-puppeteer text-[#00D8A2]"/>
                            </a>
                            <a href="https://laravel.com/">
                                <i className="fab fa-laravel text-[#FF2D20]"/>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

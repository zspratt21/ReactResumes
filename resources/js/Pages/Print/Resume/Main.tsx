import {
    faGithub, faHtml5,
    faInstagram, faLaravel,
    faLinkedinIn, faReact,
    faSalesforce, faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
    PropsWithChildren, RefObject, useEffect, useRef,
} from 'react';
import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { User } from '@/types';
import faTailWind from '@/Icons/Brands/Tailwind';
import faPuppeteer from '@/Icons/Brands/Puppeteer';
import AppHead from "@/Components/AppHead";

export default function Main({
    user, coverPhoto, coverPhotoContainerRef, nameLinksContainerRef, profilePhotoContainerRef,
    children,
}: PropsWithChildren<{
    user: User,
    coverPhoto: string | null,
    coverPhotoContainerRef: RefObject<HTMLDivElement>,
    nameLinksContainerRef: RefObject<HTMLDivElement>,
    profilePhotoContainerRef: RefObject<HTMLDivElement>,
}>) {
    const containerRef = useRef<HTMLDivElement>(null);
    library.add(faTailWind, faPuppeteer, faHtml5, faReact, faLaravel, faLinkedinIn, faGithub, faTwitter, faInstagram, faSalesforce);
    dom.watch();
    const inIframe = window.self !== window.top;

    useEffect(() => {
        document.documentElement.className = `${user.resume_options.color_scheme} ${user.resume_options.font}`;
        document.body.className = `bg-gray-100 dark:bg-gray-900`;
        if (coverPhoto) {
            if (coverPhotoContainerRef.current) {
                coverPhotoContainerRef.current.style.backgroundImage = `url(${encodeURI(coverPhoto)})`;
                coverPhotoContainerRef.current.style.backgroundSize = 'cover';
            }
        }
        if (nameLinksContainerRef.current && profilePhotoContainerRef.current) {
            profilePhotoContainerRef.current.style.height = `${nameLinksContainerRef.current.clientHeight}px`;
            profilePhotoContainerRef.current.style.width = `${nameLinksContainerRef.current.clientHeight}px`;
            profilePhotoContainerRef.current.style.backgroundImage = `url(${encodeURI(user.avatar)})`;
            profilePhotoContainerRef.current.style.backgroundSize = 'cover';
        }
        if (!inIframe) {
            const height = containerRef?.current?.clientHeight;
            const viewportHeight = window.innerHeight;
            const heightInVH = height ? ((height+25) / viewportHeight) * 100 : 0;
            let newHeightInVH = 100;
            while (heightInVH > newHeightInVH) {
                newHeightInVH += 100;
            }
            if (containerRef.current) {
                containerRef.current.style.height = `${newHeightInVH}vh`;
            }
        }
    }, []);

    return (
        <div className={`flex flex-col`} ref={containerRef}>
            <AppHead/>
            <div className="w-full flex-1">
                {children}
            </div>
            <div className="w-full">
                <footer className="pt-2 mx-auto w-fit">
                    <div className="flex space-x-2 pt-1 pb-1 border-t-2 border-gray-300 dark:border-gray-700">
                        <b className="text-gray-300 dark:text-gray-700 text-xl">
                            &#xf1f9;&nbsp;
                            {new Date().getFullYear()}
                            &nbsp;
                            {user.name}
                            . Dynamic CV | Made With
                        </b>
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

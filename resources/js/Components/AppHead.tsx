import { Head, usePage } from '@inertiajs/react';
import {PropsWithChildren} from "react";
import {PageProps} from "@/types";

interface AppHeadProps {
    title?: string;
}

export default function AppHead({ title = '', children }: PropsWithChildren<AppHeadProps>) {
    const customTitle = usePage<PageProps>().props.customTitle as string|null;
    const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
    const pageTitle = customTitle ? `${customTitle}` : `${title} - ${appName}`;
    return (
        <Head>
            <title>{`${pageTitle}`}</title>
            {children}
        </Head>
    )
}

import { useEffect, useRef } from 'react';

export default function DynamicIframe({ src, onLoad }: { src: string, onLoad?: () => void }) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null);

    useEffect(() => {
        const handleIframeLoad = () => {
            const iframe = iframeRef.current;
            if (!iframe) return;

            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDocument) return;

            const setIframeHeight = () => {
                const contentHeight = iframeDocument.documentElement.scrollHeight || iframeDocument.body.scrollHeight;
                iframe.style.height = `${contentHeight}px`;

                if (onLoad) onLoad();
            };

            const observer = new MutationObserver(setIframeHeight);
            observer.observe(iframeDocument.documentElement, {
                childList: true,
                subtree: true,
                attributes: true,
            });

            setIframeHeight();

            return () => {
                observer.disconnect();
            };
        };

        const iframe = iframeRef.current;
        if (iframe) {
            iframe.addEventListener('load', handleIframeLoad);
        }

        return () => {
            if (iframe) {
                iframe.removeEventListener('load', handleIframeLoad);
            }
        };
    }, [onLoad]);

    return (
        <iframe
            ref={iframeRef}
            title="Preview"
            className="w-full overflow-hidden"
            scrolling="no"
            src={src}
        />
    );
}

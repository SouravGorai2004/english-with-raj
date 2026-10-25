import { useEffect, useRef, useState } from 'react';
import { VideoOff } from 'lucide-react';

/** 9:16 video frame. The video source is only attached when the frame is near the viewport. */
export default function PortraitVideo({ src, poster, title }) {
    const frameRef = useRef(null);
    const [near, setNear] = useState(false);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const el = frameRef.current;
        if (!el || !('IntersectionObserver' in window)) {
            setNear(true);
            return undefined;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setNear(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '300px' }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="portrait" ref={frameRef}>
            {failed || !src ? (
                <div className="portrait__fallback" role="img" aria-label="Video unavailable">
                    <VideoOff size={28} aria-hidden="true" />
                    <span>Video unavailable</span>
                </div>
            ) : (
                <video
                    className="portrait__video"
                    controls
                    playsInline
                    preload="none"
                    poster={poster || undefined}
                    src={near ? src : undefined}
                    aria-label={title}
                    onError={() => setFailed(true)}
                />
            )}
        </div>
    );
}
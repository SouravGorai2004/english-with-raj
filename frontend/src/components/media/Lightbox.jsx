import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Lightbox({ items, index, onClose, onIndexChange }) {
    const ref = useRef(null);
    const item = items[index];

    useEffect(() => {
        const dialog = ref.current;
        if (dialog && !dialog.open) dialog.showModal();
        return () => {
            if (dialog?.open) dialog.close();
        };
    }, []);

    const prev = () => onIndexChange((index - 1 + items.length) % items.length);
    const next = () => onIndexChange((index + 1) % items.length);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    };

    if (!item) return null;

    return (
        <dialog
            ref={ref}
            className="lightbox"
            aria-label="Gallery viewer"
            onClose={onClose}
            onKeyDown={onKeyDown}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="lightbox__inner">
                <div className="lightbox__bar">
          <span aria-live="polite">
            {index + 1} / {items.length}
          </span>
                    <button type="button" className="lightbox__btn" onClick={onClose} aria-label="Close viewer">
                        <X size={22} aria-hidden="true" />
                    </button>
                </div>

                {item.mediaType === 'VIDEO' ? (
                    <video
                        key={item.id}
                        className="lightbox__media"
                        src={item.url}
                        poster={item.posterUrl || undefined}
                        controls
                        playsInline
                    />
                ) : (
                    <img key={item.id} className="lightbox__media" src={item.url} alt={item.altText || ''} />
                )}

                <div className="lightbox__bar">
                    <button type="button" className="lightbox__btn" onClick={prev} aria-label="Previous item">
                        <ChevronLeft size={22} aria-hidden="true" />
                    </button>
                    <p className="lightbox__caption">{item.caption || item.title}</p>
                    <button type="button" className="lightbox__btn" onClick={next} aria-label="Next item">
                        <ChevronRight size={22} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </dialog>
    );
}
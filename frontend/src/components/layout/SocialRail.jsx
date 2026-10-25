import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Share2, X } from 'lucide-react';
import { useSiteContent } from '../../hooks/SiteContentProvider.jsx';
import { BRAND, FALLBACK_BRAND, SocialIcon } from './SocialIcons.jsx';
import './SocialRail.css';

export default function SocialRail() {
    const reduce = useReducedMotion();
    const { content } = useSiteContent();
    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);
    const toggleRef = useRef(null);

    const links = (content?.social || []).filter((l) => l.url);

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => {
            if (e.key === 'Escape') {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        const onPointer = (e) => {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointer);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointer);
        };
    }, [open]);

    if (links.length === 0) return null;

    const last = links.length - 1;

    return (
        <aside className="sr" ref={rootRef} aria-label="Connect with English With Raj">
            <AnimatePresence>
                {open && (
                    <ul className="sr__list" id="social-menu">
                        {links.map((link, i) => (
                            <motion.li
                                key={link.platform}
                                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.5 }}
                                animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                                exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.6, transition: { duration: 0.15 } }}
                                transition={
                                    reduce
                                        ? { duration: 0.01 }
                                        : { type: 'spring', stiffness: 420, damping: 24, delay: (last - i) * 0.055 }
                                }
                            >
                                <a
                                    className="sr__item"
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ '--brand': BRAND[link.platform] || FALLBACK_BRAND }}
                                >
                  <span className="sr__icon">
                    <SocialIcon platform={link.platform} size={22} />
                  </span>
                                    <span className="sr__label">{link.label}</span>
                                </a>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </AnimatePresence>

            <button
                ref={toggleRef}
                type="button"
                className={`sr__toggle ${open ? 'is-open' : ''}`}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="social-menu"
                aria-label={open ? 'Close social links' : 'Open social links'}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={open ? 'close' : 'open'}
                        className="sr__toggle-icon"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
                        transition={{ duration: reduce ? 0.01 : 0.18 }}
                    >
                        {open ? <X size={22} aria-hidden="true" /> : <Share2 size={22} aria-hidden="true" />}
                    </motion.span>
                </AnimatePresence>
            </button>
        </aside>
    );
}
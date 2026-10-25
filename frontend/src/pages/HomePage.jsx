import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import SocialLinks from '../components/layout/SocialLinks.jsx';
import { useSiteContent } from '../hooks/SiteContentProvider.jsx';
import { HOME_DEFAULTS } from '../data/homeDefaults.js';
import { ROUTES } from '../config/routes.js';
import './Home.css';

/** Renders the headline with the accent phrase in italic colour. */
function renderTitle(title, accent) {
    const at = accent ? title.indexOf(accent) : -1;
    if (at < 0) return title;
    return (
        <>
            {title.slice(0, at)}
            <em>{accent}</em>
            {title.slice(at + accent.length)}
        </>
    );
}

export default function HomePage() {
    const { content } = useSiteContent();
    const home = useMemo(() => ({ ...HOME_DEFAULTS, ...(content?.home || {}) }), [content]);
    const hasSocial = (content?.social || []).some((s) => s.url);

    return (
        <>
            <Seo
                title="Spoken English & Communication Coaching"
                description="Structured English programs from foundation to fluency, interview preparation and personality development with Raj."
                path="/"
            />

            <section className="hm">
                <div className="container hm__grid">
                    <div className="hm-copy">
                        <p className="hm-eyebrow hm-in" style={{ '--i': 0 }}>
                            <span aria-hidden="true" />
                            {home.pill}
                        </p>

                        <h1 className="hm-title hm-in" style={{ '--i': 1 }}>
                            <span className="hm-hi">{home.hi}</span>
                            <span className="hm-main">{renderTitle(home.title, home.accent)}</span>
                        </h1>

                        <p className="hm-desc hm-in" style={{ '--i': 2 }}>
                            {home.description}
                        </p>

                        <div className="hm-actions hm-in" style={{ '--i': 3 }}>
                            <Button to={ROUTES.courses} className="hm-btn">
                                {home.primaryCta} <ArrowRight size={18} aria-hidden="true" />
                            </Button>
                            <Button to={ROUTES.demo} variant="outline" className="hm-btn">
                                {home.secondaryCta}
                            </Button>
                        </div>

                        {hasSocial && (
                            <div className="hm-follow hm-in" style={{ '--i': 4 }}>
                                <span className="hm-follow__label">{home.followLabel}</span>
                                <span className="hm-follow__line" aria-hidden="true" />
                                <SocialLinks label="Follow English With Raj" />
                            </div>
                        )}
                    </div>

                    <div className="hm-stage hm-in hm-in--photo" style={{ '--i': 2 }}>
                        <span className="hm-disc" aria-hidden="true" />
                        <img
                            className="hm-photo"
                            src={home.imageUrl}
                            alt={home.imageAlt}
                            width="800"
                            height="1000"
                            fetchpriority="high"
                            decoding="async"
                            draggable="false"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import {
    ArrowRight,
    BookOpen,
    Building2,
    Check,
    Compass,
    Ear,
    MapPin,
    MessageCircle,
    Mic,
    Monitor,
    TrendingUp,
    Waves,
} from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import Reveal from '../motion/Reveal.jsx';
import { LoadingState } from '../components/ui/States.jsx';
import { useSiteContent } from '../hooks/SiteContentProvider.jsx';
import { ABOUT_DEFAULTS } from '../data/aboutDefaults.js';
import { ROUTES } from '../config/routes.js';
import './About.css';

const EASE = [0.22, 1, 0.36, 1];

const ICONS = {
    book: BookOpen,
    building: Building2,
    compass: Compass,
    ear: Ear,
    message: MessageCircle,
    mic: Mic,
    monitor: Monitor,
    trend: TrendingUp,
    waves: Waves,
};
const PILLAR_FALLBACK = ['mic', 'book', 'waves'];

function Icon({ name, size = 22 }) {
    const Cmp = ICONS[name] || Mic;
    return <Cmp size={size} aria-hidden="true" />;
}

function spotlight(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function JourneyStep({ step, index, last }) {
    const ref = useRef(null);
    const seen = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
    return (
        <li
            ref={ref}
            className={`ab-step ${seen ? 'is-seen' : ''} ${last ? 'is-last' : ''}`}
            style={{ '--d': `${index * 0.14}s` }}
        >
      <span className="ab-step__node">
        <Icon name={step.icon} size={22} />
        <span className="ab-step__num">{index + 1}</span>
      </span>
            <div className="ab-step__body">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
            </div>
        </li>
    );
}

function Modes({ modes, note, address, reduce }) {
    const [active, setActive] = useState(modes[0]?.id);
    const current = modes.find((m) => m.id === active) || modes[0];
    const tabRefs = useRef([]);

    const onKeyDown = (e, i) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + modes.length) % modes.length;
        setActive(modes[next].id);
        tabRefs.current[next]?.focus();
    };

    if (!current) return null;

    return (
        <div className="ab-modes">
            <div className="ab-switch" role="tablist" aria-label="Learning mode">
                {modes.map((m, i) => (
                    <button
                        key={m.id}
                        ref={(el) => (tabRefs.current[i] = el)}
                        type="button"
                        role="tab"
                        id={`mode-tab-${m.id}`}
                        aria-selected={active === m.id}
                        aria-controls={`mode-panel-${m.id}`}
                        tabIndex={active === m.id ? 0 : -1}
                        className={`ab-switch__btn ${active === m.id ? 'is-active' : ''}`}
                        onClick={() => setActive(m.id)}
                        onKeyDown={(e) => onKeyDown(e, i)}
                    >
                        {active === m.id && (
                            <motion.span
                                layoutId="ab-switch-pill"
                                className="ab-switch__pill"
                                transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
                            />
                        )}
                        <span className="ab-switch__label">
              <Icon name={m.icon} size={18} />
                            {m.label}
            </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={current.id}
                    role="tabpanel"
                    id={`mode-panel-${current.id}`}
                    aria-labelledby={`mode-tab-${current.id}`}
                    className="ab-mode"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: reduce ? 0.01 : 0.4, ease: EASE }}
                >
                    <div className="ab-mode__text">
                        <h3>{current.title}</h3>
                        <p>{current.text}</p>
                        <ul className="ab-points">
                            {current.points.map((p) => (
                                <li key={p}>
                                    <Check size={18} aria-hidden="true" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                        {current.id === 'offline' && (
                            <p className="ab-where">
                                <MapPin size={18} aria-hidden="true" />
                                <span>{address ? address : 'Classroom location is shared when you register.'}</span>
                            </p>
                        )}
                    </div>

                    <div className={`ab-mode__visual ab-mode__visual--${current.id}`} aria-hidden="true">
                        <span className="ab-mode__ring ab-mode__ring--1" />
                        <span className="ab-mode__ring ab-mode__ring--2" />
                        <span className="ab-mode__icon">
              <Icon name={current.icon} size={44} />
            </span>
                        <span className="ab-mode__tag">{current.label}</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            {note && <p className="ab-note">{note}</p>}
        </div>
    );
}

export default function AboutPage() {
    const reduce = useReducedMotion();
    const { content, loading } = useSiteContent();

    const about = useMemo(() => ({ ...ABOUT_DEFAULTS, ...(content?.about || {}) }), [content]);
    const stats = (content?.stats || []).filter((s) => s.verified);
    const address = content?.contact?.address;

    if (loading) {
        return (
            <div className="container" style={{ minHeight: '60vh' }}>
                <LoadingState />
            </div>
        );
    }

    const heroIn = (delay) =>
        reduce
            ? {}
            : {
                initial: { opacity: 0, y: 26 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay, ease: EASE },
            };

    return (
        <div className="ab">
            <Seo
                title="About"
                description="The philosophy and teaching approach behind English With Raj, with online and offline classes."
                path="/about"
            />

            {/* HERO */}
            <section className="ab-hero">
                <div className="ab-hero__glow" aria-hidden="true" />
                <div className="container ab-hero__grid">
                    <div>
                        <motion.span className="eyebrow" {...heroIn(0)}>
                            About
                        </motion.span>
                        <motion.h1 className="ab-title" {...heroIn(0.08)}>
                            {about.heading}
                        </motion.h1>
                        <motion.p className="ab-statement" {...heroIn(0.18)}>
                            {about.statement}
                        </motion.p>
                        <motion.div className="ab-hero__actions" {...heroIn(0.28)}>
                            <Button to={ROUTES.courses}>
                                Explore Courses <ArrowRight size={18} aria-hidden="true" />
                            </Button>
                            <Button to={ROUTES.demo} variant="outline">
                                Book a Demo Class
                            </Button>
                        </motion.div>
                    </div>

                    <motion.div className="ab-photo" {...heroIn(0.2)}>
                        <div className="ab-photo__frame">
                            <img src={about.imageUrl} alt={about.imageAlt} width="800" height="1000" fetchpriority="high" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FOUNDER */}
            <section className="ab-section">
                <div className="container ab-founder">
                    <Reveal>
                        <span className="eyebrow">{about.founderHeading}</span>
                        <blockquote className="ab-quote">
              <span className="ab-quote__mark" aria-hidden="true">
                “
              </span>
                            {about.quote}
                        </blockquote>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <p className="ab-story">{about.story}</p>
                        <ul className="ab-principles">
                            {about.principles.map((p) => (
                                <li key={p.title}>
                  <span className="ab-principles__icon">
                    <Icon name={p.icon} size={20} />
                  </span>
                                    <div>
                                        <strong>{p.title}</strong>
                                        <span>{p.text}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* PILLARS */}
            <section className="ab-section ab-section--alt">
                <div className="container">
                    <Reveal>
                        <span className="eyebrow">Our approach</span>
                        <h2 className="ab-h2">Three pillars of every class</h2>
                    </Reveal>
                    <ol className="ab-pillars">
                        {about.pillars.map((p, i) => (
                            <Reveal as="li" key={p.title} delay={i * 0.09}>
                                <div className="ab-pillar" onPointerMove={spotlight}>
                                    <span className="ab-pillar__num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="ab-pillar__icon">
                    <Icon name={p.icon || PILLAR_FALLBACK[i % PILLAR_FALLBACK.length]} size={26} />
                  </span>
                                    <h3>{p.title}</h3>
                                    <p>{p.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            {/* JOURNEY */}
            <section className="ab-section">
                <div className="container">
                    <Reveal>
                        <span className="eyebrow">The journey</span>
                        <h2 className="ab-h2">{about.journeyHeading}</h2>
                    </Reveal>
                    <ol className="ab-journey">
                        {about.journey.map((step, i) => (
                            <JourneyStep key={step.title} step={step} index={i} last={i === about.journey.length - 1} />
                        ))}
                    </ol>
                </div>
            </section>

            {/* ONLINE / OFFLINE */}
            <section className="ab-section ab-section--alt">
                <div className="container">
                    <Reveal>
                        <span className="eyebrow">Teaching environment</span>
                        <h2 className="ab-h2">{about.modesHeading}</h2>
                    </Reveal>
                    <Reveal delay={0.08}>
                        <Modes modes={about.modes} note={about.modesNote} address={address} reduce={reduce} />
                    </Reveal>
                </div>
            </section>

            {/* STATS (verified only) */}
            {stats.length > 0 && (
                <section className="ab-section">
                    <div className="container">
                        <dl className="ab-stats">
                            {stats.map((s, i) => (
                                <Reveal key={s.label} delay={i * 0.07}>
                                    <div className="ab-stat">
                                        <dd>{s.value}</dd>
                                        <dt>{s.label}</dt>
                                    </div>
                                </Reveal>
                            ))}
                        </dl>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="ab-section">
                <div className="container">
                    <Reveal>
                        <div className="ab-cta">
                            <h2>{about.ctaTitle}</h2>
                            <p>{about.ctaText}</p>
                            <div className="ab-cta__actions">
                                <Link to={ROUTES.demo} className="btn btn--primary">
                                    Book a Demo Class <ArrowRight size={18} aria-hidden="true" />
                                </Link>
                                <Link to={ROUTES.contact} className="btn btn--outline ab-cta__ghost">
                                    Contact Raj
                                </Link>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
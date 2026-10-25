import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'framer-motion';
import {
    ArrowRight,
    CalendarDays,
    Check,
    ChevronRight,
    Clock,
    Layers,
    Monitor,
    Plus,
    Sparkles,
    Target,
    Users,
} from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import Price from '../components/ui/Price.jsx';
import Reveal from '../motion/Reveal.jsx';
import { ErrorState, LoadingState } from '../components/ui/States.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { courseService } from '../services/courseService.js';
import { ROUTES } from '../config/routes.js';
import './CourseDetail.css';

const EASE = [0.22, 1, 0.36, 1];

/** Cursor-following glow used by the glass cards. */
function spotlight(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function useScrollSpy(ids) {
    const key = ids.join('|');
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const els = key
            .split('|')
            .map((id) => document.getElementById(id))
            .filter(Boolean);
        if (els.length === 0 || !('IntersectionObserver' in window)) return undefined;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: '-35% 0px -55% 0px' }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [key]);

    return active;
}

function Collapse({ open, reduce, children }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                    style={{ overflow: 'hidden' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Curriculum({ modules, reduce }) {
    const listRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0);
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ['start 75%', 'end 55%'],
    });

    return (
        <ol className="cd-timeline" ref={listRef}>
      <span className="cd-timeline__rail" aria-hidden="true">
        <motion.span
            className="cd-timeline__fill"
            style={{ scaleY: reduce ? 1 : scrollYProgress, transformOrigin: 'top' }}
        />
      </span>
            {modules.map((mod, i) => {
                const open = openIndex === i;
                return (
                    <li className={`cd-module ${open ? 'is-open' : ''}`} key={mod.title}>
            <span className="cd-module__node" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
                        <div className="cd-module__body">
                            <button
                                type="button"
                                className="cd-module__head"
                                aria-expanded={open}
                                aria-controls={`module-${i}`}
                                onClick={() => setOpenIndex(open ? -1 : i)}
                            >
                                <span>{mod.title}</span>
                                <Plus size={20} aria-hidden="true" className="cd-plus" />
                            </button>
                            <div id={`module-${i}`}>
                                <Collapse open={open} reduce={reduce}>
                                    <ul className="cd-topics">
                                        {(mod.topics || []).map((t) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                </Collapse>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

function Faq({ items, reduce }) {
    const [openIndex, setOpenIndex] = useState(0);
    return (
        <div className="cd-faq">
            {items.map((item, i) => {
                const open = openIndex === i;
                return (
                    <div className={`cd-faq__item ${open ? 'is-open' : ''}`} key={item.question}>
                        <button
                            type="button"
                            className="cd-faq__q"
                            aria-expanded={open}
                            aria-controls={`faq-${i}`}
                            onClick={() => setOpenIndex(open ? -1 : i)}
                        >
                            <span>{item.question}</span>
                            <Plus size={20} aria-hidden="true" className="cd-plus" />
                        </button>
                        <div id={`faq-${i}`}>
                            <Collapse open={open} reduce={reduce}>
                                <p className="cd-faq__a">{item.answer}</p>
                            </Collapse>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function CourseView({ course }) {
    const reduce = useReducedMotion();
    const registerUrl = `${ROUTES.register}?course=${encodeURIComponent(course.slug)}`;
    const demoUrl = `${ROUTES.demo}?course=${encodeURIComponent(course.slug)}`;

    const hasOutcomes = course.learningOutcomes?.length > 0;
    const hasSyllabus = course.syllabus?.length > 0;
    const hasFeatures = course.features?.length > 0;
    const hasFaqs = course.faqs?.length > 0;

    const sections = useMemo(
        () =>
            [
                { id: 'overview', label: 'Overview' },
                hasOutcomes && { id: 'outcomes', label: 'Outcomes' },
                hasSyllabus && { id: 'curriculum', label: 'Curriculum' },
                hasFeatures && { id: 'included', label: 'Included' },
                hasFaqs && { id: 'faq', label: 'FAQ' },
            ].filter(Boolean),
        [hasOutcomes, hasSyllabus, hasFeatures, hasFaqs]
    );
    const active = useScrollSpy(sections.map((s) => s.id));

    const goTo = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    };

    const facts = [
        { Icon: Clock, label: 'Duration', value: course.duration },
        { Icon: Monitor, label: 'Mode', value: course.deliveryMode },
        { Icon: Layers, label: 'Level', value: course.level },
        { Icon: CalendarDays, label: 'Batch', value: course.batchInfo },
    ].filter((f) => f.value);

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.05 } },
    };
    const item = {
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: EASE } },
    };

    return (
        <div className="cd">
            <Seo title={course.title} description={course.shortDescription} path={`/courses/${course.slug}`} />

            {/* HERO */}
            <section className="cd-hero">
                <div className="cd-hero__grid-bg" aria-hidden="true" />
                <div className="container cd-hero__inner">
                    <motion.div variants={container} initial="hidden" animate="show">
                        <motion.nav variants={item} className="cd-crumbs" aria-label="Breadcrumb">
                            <Link to={ROUTES.courses}>Courses</Link>
                            <ChevronRight size={14} aria-hidden="true" />
                            <span aria-current="page">{course.title}</span>
                        </motion.nav>

                        <motion.div variants={item} className="cd-badges">
                            {course.category && <span className="cd-badge cd-badge--accent">{course.category}</span>}
                            {course.level && <span className="cd-badge">{course.level}</span>}
                            {course.isDemo && <span className="cd-badge cd-badge--dashed">Demo content</span>}
                        </motion.div>

                        <motion.h1 variants={item} className="cd-title">
                            {course.title}
                        </motion.h1>

                        <motion.p variants={item} className="cd-sub">
                            {course.shortDescription}
                        </motion.p>

                        <motion.ul variants={item} className="cd-facts" aria-label="Course facts">
                            {facts.map(({ Icon, label, value }) => (
                                <li key={label} className="cd-fact">
                                    <Icon size={18} aria-hidden="true" />
                                    <span>
                    <small>{label}</small>
                                        {value}
                  </span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div variants={item} className="cd-actions">
                            {course.registrationOpen ? (
                                <Button to={registerUrl} className="cd-btn-big">
                                    Register Now <ArrowRight size={18} aria-hidden="true" />
                                </Button>
                            ) : (
                                <span className="cd-closed">Registration is currently closed</span>
                            )}
                            <Button to={demoUrl} variant="outline" className="cd-btn-big">
                                Book a Demo Class
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.aside
                        className="cd-card"
                        aria-label="Enrolment summary"
                        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.25, ease: EASE }}
                        onPointerMove={spotlight}
                    >
                        <div className="cd-card__media">
                            <img src={course.imageUrl} alt={course.imageAlt || ''} width="1200" height="900" fetchpriority="high" />
                            {course.registrationOpen && (
                                <span className="cd-live">
                  <i aria-hidden="true" /> Registration open
                </span>
                            )}
                        </div>
                        <div className="cd-card__body">
                            <Price
                                regularMinor={course.regularPriceMinor}
                                discountedMinor={course.discountedPriceMinor}
                                currency={course.currency}
                            />
                            {course.registrationOpen && (
                                <Button to={registerUrl} className="cd-card__cta">
                                    Register Now
                                </Button>
                            )}
                            <p className="cd-card__note">Registering is a request. No payment is taken on this site.</p>
                        </div>
                    </motion.aside>
                </div>
            </section>

            {/* SECTION TABS */}
            <div className="cd-tabs">
                <div className="container">
                    <nav aria-label="Course sections" className="cd-tabs__nav">
                        {sections.map((s) => (
                            <button
                                key={s.id}
                                type="button"
                                className={`cd-tab ${active === s.id ? 'is-active' : ''}`}
                                aria-current={active === s.id ? 'true' : undefined}
                                onClick={() => goTo(s.id)}
                            >
                                {s.label}
                                {active === s.id && <motion.span layoutId="cd-tab-underline" className="cd-tab__line" />}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* OVERVIEW */}
            <section id="overview" className="cd-section">
                <div className="container cd-overview">
                    <Reveal>
                        <span className="eyebrow">Overview</span>
                        <h2 className="cd-h2">What this course is about</h2>
                        <p className="cd-lead">{course.fullDescription}</p>
                    </Reveal>
                    {course.audience && (
                        <Reveal delay={0.1}>
                            <div className="cd-panel" onPointerMove={spotlight}>
                                <Users size={24} aria-hidden="true" />
                                <h3>Who should join</h3>
                                <p>{course.audience}</p>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* OUTCOMES */}
            {hasOutcomes && (
                <section id="outcomes" className="cd-section cd-section--alt">
                    <div className="container">
                        <Reveal>
                            <span className="eyebrow">Outcomes</span>
                            <h2 className="cd-h2">What you will be able to do</h2>
                        </Reveal>
                        <ul className="cd-bento">
                            {course.learningOutcomes.map((o, i) => (
                                <Reveal as="li" key={o} delay={Math.min(i, 5) * 0.06}>
                                    <div className="cd-outcome" onPointerMove={spotlight}>
                                        <span className="cd-outcome__num">{String(i + 1).padStart(2, '0')}</span>
                                        <Target size={20} aria-hidden="true" className="cd-outcome__icon" />
                                        <p>{o}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* CURRICULUM */}
            {hasSyllabus && (
                <section id="curriculum" className="cd-section">
                    <div className="container cd-curriculum">
                        <Reveal>
                            <span className="eyebrow">Curriculum</span>
                            <h2 className="cd-h2">A clear path, step by step</h2>
                            <p className="muted" style={{ maxWidth: '38ch' }}>
                                Open any module to see the topics it covers.
                            </p>
                        </Reveal>
                        <Curriculum modules={course.syllabus} reduce={reduce} />
                    </div>
                </section>
            )}

            {/* INCLUDED */}
            {hasFeatures && (
                <section id="included" className="cd-section cd-section--alt">
                    <div className="container">
                        <Reveal>
                            <span className="eyebrow">Included</span>
                            <h2 className="cd-h2">Everything in your programme</h2>
                        </Reveal>
                        <ul className="cd-feats">
                            {course.features.map((f, i) => (
                                <Reveal as="li" key={f} delay={Math.min(i, 5) * 0.05}>
                                    <div className="cd-feat" onPointerMove={spotlight}>
                                        <Sparkles size={20} aria-hidden="true" />
                                        <span>{f}</span>
                                    </div>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {hasFaqs && (
                <section id="faq" className="cd-section">
                    <div className="container cd-faq-wrap">
                        <Reveal>
                            <span className="eyebrow">FAQ</span>
                            <h2 className="cd-h2">Questions, answered</h2>
                        </Reveal>
                        <Faq items={course.faqs} reduce={reduce} />
                    </div>
                </section>
            )}

            {/* FINAL CTA */}
            <section className="cd-section">
                <div className="container">
                    <Reveal>
                        <div className="cd-cta">
                            <h2>Ready to start speaking with confidence?</h2>
                            <p>Register for {course.title}, or try a demo class first.</p>
                            <div className="cd-actions" style={{ justifyContent: 'center' }}>
                                {course.registrationOpen && (
                                    <Button to={registerUrl} className="cd-btn-big">
                                        Register Now <ArrowRight size={18} aria-hidden="true" />
                                    </Button>
                                )}
                                <Button to={demoUrl} variant="outline" className="cd-btn-big cd-btn-light">
                                    Book a Demo Class
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* MOBILE STICKY BAR */}
            {course.registrationOpen && (
                <div className="cd-mobilebar">
                    <div>
                        <span className="cd-mobilebar__label">{course.title}</span>
                        <Price
                            regularMinor={course.regularPriceMinor}
                            discountedMinor={course.discountedPriceMinor}
                            currency={course.currency}
                        />
                    </div>
                    <Button to={registerUrl} size="sm">
                        Register
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function CourseDetailPage() {
    const { slug } = useParams();
    const { data: course, loading, error, reload } = useAsync(() => courseService.getBySlug(slug), [slug]);

    if (loading) {
        return (
            <div className="container" style={{ minHeight: '60vh' }}>
                <LoadingState label="Loading course…" />
            </div>
        );
    }

    if (error?.status === 404) {
        return (
            <section className="section">
                <Seo title="Course not available" noindex />
                <div className="container" style={{ maxWidth: 'var(--container-narrow)' }}>
                    <span className="eyebrow">Course unavailable</span>
                    <h1 style={{ fontSize: 'var(--text-3xl)' }}>This course isn't available.</h1>
                    <p className="lead">It may have been unpublished or the link may be incorrect.</p>
                    <Button to={ROUTES.courses}>See all courses</Button>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <div className="container">
                <ErrorState error={error} onRetry={reload} />
            </div>
        );
    }

    return <CourseView course={course} />;
}
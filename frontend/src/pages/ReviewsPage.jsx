import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Quote, VideoOff } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { reviewService } from '../services/reviewService.js';
import './Reviews.css';

const EASE = [0.22, 1, 0.36, 1];
const TITLE_WORDS = ['In', 'their', 'own', 'words.'];

function ReelCard({ video, index, active, onPlay, onStop, reduce }) {
    const [failed, setFailed] = useState(false);
    const canPlay = Boolean(video.videoUrl) && !failed;
    const playing = active && canPlay;

    return (
        <motion.article
            className="rv-reel"
            initial={reduce ? false : { opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: Math.min(index, 5) * 0.08, ease: EASE }}
            whileHover={reduce ? undefined : { y: -8 }}
        >
            <div className="rv-reel__frame">
                {playing ? (
                    <video
                        className="rv-reel__video"
                        src={video.videoUrl}
                        poster={video.posterUrl || undefined}
                        controls
                        autoPlay
                        playsInline
                        onEnded={onStop}
                        onError={() => {
                            setFailed(true);
                            onStop();
                        }}
                    />
                ) : (
                    <>
                        {video.posterUrl ? (
                            <img className="rv-reel__poster" src={video.posterUrl} alt="" width="720" height="1280" loading="lazy" />
                        ) : (
                            <div className="rv-reel__noposter" />
                        )}
                        <div className="rv-reel__shade" />
                        <button
                            type="button"
                            className="rv-reel__play"
                            onClick={onPlay}
                            disabled={!canPlay}
                            aria-label={canPlay ? `Play video from ${video.studentName}` : 'Video not available'}
                        >
                            {canPlay ? <Play size={26} aria-hidden="true" /> : <VideoOff size={24} aria-hidden="true" />}
                        </button>
                        {!canPlay && (
                            <span className="rv-reel__flag">{video.isDemo ? 'Demo placeholder' : 'Video unavailable'}</span>
                        )}
                        <div className="rv-reel__info">
                            <strong>{video.studentName}</strong>
                            {video.courseOrBatch && <span>{video.courseOrBatch}</span>}
                            {video.achievement && <em>{video.achievement}</em>}
                            {video.caption && !video.isDemo && <small>{video.caption}</small>}
                        </div>
                    </>
                )}
            </div>
        </motion.article>
    );
}

function ReviewCard({ review, index, reduce }) {
    const stars = review.rating ? '★'.repeat(review.rating) : '';
    return (
        <motion.figure
            className="rv-card"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: Math.min(index, 6) * 0.06, ease: EASE }}
        >
            <Quote size={28} className="rv-card__quote" aria-hidden="true" />
            <blockquote className="rv-card__text">{review.body}</blockquote>
            <figcaption className="rv-card__who">
        <span className="rv-card__avatar" aria-hidden="true">
          {review.studentName.charAt(0)}
        </span>
                <span>
          <strong>{review.studentName}</strong>
                    {review.courseOrBatch && <small>{review.courseOrBatch}</small>}
        </span>
                {stars && (
                    <span className="rv-stars" role="img" aria-label={`Rated ${review.rating} out of 5`}>
            {stars}
          </span>
                )}
            </figcaption>
            {review.isDemo && <span className="rv-demo">Demo content</span>}
        </motion.figure>
    );
}

export default function ReviewsPage() {
    const reduce = useReducedMotion();
    const { data, loading, error, reload } = useAsync(() => reviewService.list(), []);
    const [activeId, setActiveId] = useState(null);
    const scrollerRef = useRef(null);

    const items = data?.items || [];
    const videos = items.filter((r) => r.type === 'VIDEO');
    const texts = items.filter((r) => r.type === 'TEXT');

    const scrollReels = (dir) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' });
    };

    return (
        <>
            <Seo title="Student Reviews" description="Hear from learners who studied with Raj." path="/reviews" />

            <div className="rv">
                <section className="rv-hero">
                    <div className="rv-hero__glow" aria-hidden="true" />
                    <div className="container">
                        <motion.span
                            className="eyebrow"
                            initial={reduce ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Reviews
                        </motion.span>
                        <h1 className="rv-title" aria-label="In their own words.">
                            {TITLE_WORDS.map((word, i) => (
                                <span className="rv-word" key={word} aria-hidden="true">
                  <motion.span
                      initial={reduce ? false : { y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                                    {i < TITLE_WORDS.length - 1 ? '\u00a0' : ''}
                </span>
                            ))}
                        </h1>
                        <motion.p
                            className="lead"
                            initial={reduce ? false : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                        >
                            Video and written feedback shared by our students with their consent.
                        </motion.p>
                    </div>
                </section>

                <div className="container">
                    {loading && <LoadingState label="Loading reviews…" />}
                    {error && <ErrorState error={error} onRetry={reload} />}
                    {!loading && !error && items.length === 0 && <EmptyState title="Reviews will appear here soon" />}
                </div>

                {videos.length > 0 && (
                    <section className="rv-section" aria-labelledby="reels-title">
                        <div className="container rv-section__head">
                            <div>
                                <span className="eyebrow">Reels</span>
                                <h2 id="reels-title" className="rv-h2">
                                    Hear it from them
                                </h2>
                            </div>
                            {videos.length > 1 && (
                                <div className="rv-arrows">
                                    <button type="button" className="icon-btn" onClick={() => scrollReels(-1)} aria-label="Previous reels">
                                        <ChevronLeft size={20} aria-hidden="true" />
                                    </button>
                                    <button type="button" className="icon-btn" onClick={() => scrollReels(1)} aria-label="Next reels">
                                        <ChevronRight size={20} aria-hidden="true" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="rv-reels" ref={scrollerRef} tabIndex={0} aria-label="Video testimonials, scroll sideways">
                            {videos.map((v, i) => (
                                <ReelCard
                                    key={v.id}
                                    video={v}
                                    index={i}
                                    reduce={reduce}
                                    active={activeId === v.id}
                                    onPlay={() => setActiveId(v.id)}
                                    onStop={() => setActiveId(null)}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {texts.length > 0 && (
                    <section className="rv-section" aria-labelledby="written-title">
                        <div className="container">
                            <span className="eyebrow">Written reviews</span>
                            <h2 id="written-title" className="rv-h2">
                                What learners say
                            </h2>
                            <div className="rv-cards">
                                {texts.map((r, i) => (
                                    <ReviewCard key={r.id} review={r} index={i} reduce={reduce} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    );
}
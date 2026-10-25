import { useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import Lightbox from '../components/media/Lightbox.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { galleryService } from '../services/galleryService.js';
import './Gallery.css';

const MIN_PER_HALF = 10; // each scrolling half holds at least this many tiles so it never shows a gap

/** More images → more rows, so everything stays inside one screen. */
function rowCountFor(n) {
    if (n <= 3) return 1;
    if (n <= 8) return 2;
    if (n <= 16) return 3;
    return 4;
}

function buildRows(items) {
    const count = rowCountFor(items.length);
    const rows = Array.from({ length: count }, () => []);
    items.forEach((item, index) => rows[index % count].push({ item, index }));
    return rows;
}

function Tile({ entry, onOpen, focusable, extraClass }) {
    const { item, index } = entry;
    const w = item.width || 4;
    const h = item.height || 3;
    const src = item.mediaType === 'VIDEO' ? item.posterUrl : item.url;
    const label = item.title || item.altText || 'gallery item';

    return (
        <li className={`gx-tile ${extraClass}`}>
            <button
                type="button"
                className="gx-btn"
                style={{ aspectRatio: `${w} / ${h}` }}
                onClick={() => onOpen(index)}
                tabIndex={focusable ? 0 : -1}
                aria-label={`Open ${label}`}
            >
                <img src={src} alt={item.altText || ''} width={w} height={h} loading="lazy" draggable="false" />
                {item.mediaType === 'VIDEO' && (
                    <span className="gx-play" aria-hidden="true">
            <Play size={16} />
          </span>
                )}
                {(item.caption || item.title) && <span className="gx-cap">{item.caption || item.title}</span>}
            </button>
        </li>
    );
}

function MarqueeRow({ entries, rowIndex, onOpen }) {
    const repeat = Math.max(1, Math.ceil(MIN_PER_HALF / entries.length));
    const half = [];
    for (let r = 0; r < repeat; r += 1) {
        entries.forEach((entry) => half.push({ entry, rep: r }));
    }
    const duration = Math.max(28, half.length * 5) + rowIndex * 6;
    const reverse = rowIndex % 2 === 1;

    return (
        <div className="gx-row">
            <div
                className="gx-track"
                style={{ '--dur': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
            >
                {[0, 1].map((copy) => (
                    <ul key={copy} className="gx-half" aria-hidden={copy === 1 ? 'true' : undefined}>
                        {half.map(({ entry, rep }) => (
                            <Tile
                                key={`${copy}-${rep}-${entry.index}`}
                                entry={entry}
                                onOpen={onOpen}
                                focusable={copy === 0 && rep === 0}
                                extraClass={rep > 0 ? 'gx-rep' : ''}
                            />
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    );
}

export default function GalleryPage() {
    const { data, loading, error, reload } = useAsync(() => galleryService.list(), []);
    const [category, setCategory] = useState('All');
    const [openIndex, setOpenIndex] = useState(null);

    const items = data?.items || [];
    const categories = useMemo(
        () => ['All', ...new Set(items.map((i) => i.category).filter(Boolean))],
        [items]
    );
    const visible = useMemo(
        () => (category === 'All' ? items : items.filter((i) => i.category === category)),
        [items, category]
    );
    const rows = useMemo(() => (visible.length ? buildRows(visible) : []), [visible]);

    return (
        <>
            <Seo title="Gallery" description="Photos and videos from English With Raj classes and events." path="/gallery" />

            <section className="gx">
                <div className="container gx-head">
                    <div>
                        <span className="eyebrow">Gallery</span>
                        <h1>Moments from the classroom.</h1>
                    </div>
                    {categories.length > 2 && (
                        <div className="chips" role="group" aria-label="Filter gallery by category" style={{ margin: 0 }}>
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className="chip"
                                    aria-pressed={category === c}
                                    onClick={() => setCategory(c)}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {loading && (
                    <div className="container">
                        <LoadingState label="Loading gallery…" />
                    </div>
                )}
                {error && (
                    <div className="container">
                        <ErrorState error={error} onRetry={reload} />
                    </div>
                )}
                {!loading && !error && items.length === 0 && (
                    <div className="container">
                        <EmptyState title="Gallery items will appear here soon" />
                    </div>
                )}

                {rows.length > 0 && (
                    <>
                        <div className="gx-stage" key={`${category}-${visible.length}`}>
                            {rows.map((entries, rowIndex) => (
                                <MarqueeRow key={rowIndex} entries={entries} rowIndex={rowIndex} onOpen={setOpenIndex} />
                            ))}
                        </div>
                        <p className="gx-hint container">Hover to pause and zoom. Click or tap to open.</p>
                    </>
                )}
            </section>

            {openIndex !== null && (
                <Lightbox
                    items={visible}
                    index={openIndex}
                    onIndexChange={setOpenIndex}
                    onClose={() => setOpenIndex(null)}
                />
            )}
        </>
    );
}
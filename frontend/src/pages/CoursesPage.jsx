import { useMemo, useState } from 'react';
import Seo from '../components/seo/Seo.jsx';
import { EmptyState, ErrorState, LoadingState } from '../components/ui/States.jsx';
import CourseRow from '../features/courses/CourseRow.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { courseService } from '../services/courseService.js';

export default function CoursesPage() {
    const { data, loading, error, reload } = useAsync(() => courseService.list(), []);
    const [category, setCategory] = useState('');
    const [level, setLevel] = useState('');

    const items = data?.items || [];
    const categories = useMemo(() => [...new Set(items.map((c) => c.category).filter(Boolean))], [items]);
    const levels = useMemo(() => [...new Set(items.map((c) => c.level).filter(Boolean))], [items]);
    const filtered = items.filter(
        (c) => (!category || c.category === category) && (!level || c.level === level)
    );

    return (
        <>
            <Seo
                title="Courses"
                description="Spoken English, interview preparation and communication courses taught by Raj."
                path="/courses"
            />
            <section className="page-head">
                <div className="container">
                    <span className="eyebrow">Courses</span>
                    <h1>Find the programme that fits where you are.</h1>
                    <p className="lead">Choose a course, read the details, and register when you are ready.</p>
                </div>
            </section>

            <section className="section" style={{ paddingTop: 0 }}>
                <div className="container">
                    {loading && <LoadingState label="Loading courses…" />}
                    {error && <ErrorState error={error} onRetry={reload} />}

                    {!loading && !error && items.length > 0 && (
                        <div className="filters">
                            <label>
                                Category
                                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">All categories</option>
                                    {categories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Level
                                <select value={level} onChange={(e) => setLevel(e.target.value)}>
                                    <option value="">All levels</option>
                                    {levels.map((l) => (
                                        <option key={l} value={l}>{l}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    )}

                    {!loading && !error && items.length === 0 && (
                        <EmptyState title="No courses are open right now">
                            Please check back soon or contact us to ask about upcoming batches.
                        </EmptyState>
                    )}

                    {!loading && !error && items.length > 0 && filtered.length === 0 && (
                        <EmptyState title="No courses match these filters">Try choosing a different category or level.</EmptyState>
                    )}

                    {filtered.length > 0 && (
                        <div className="course-list">
                            {filtered.map((course) => (
                                <CourseRow key={course.id} course={course} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
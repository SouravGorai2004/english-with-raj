import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button.jsx';
import Price from '../../components/ui/Price.jsx';
import Reveal from '../../motion/Reveal.jsx';
import { ROUTES } from '../../config/routes.js';

export default function CourseRow({ course }) {
    const detailPath = ROUTES.course(course.slug);
    return (
        <Reveal as="article" className="course-row">
            <Link to={detailPath} className="course-row__media" tabIndex={-1} aria-hidden="true">
                <img src={course.imageUrl} alt="" loading="lazy" width="640" height="480" />
            </Link>
            <div>
                <p className="eyebrow">
                    {[course.category, course.level].filter(Boolean).join(' · ')}
                </p>
                <h2 className="course-row__title">
                    <Link to={detailPath}>{course.title}</Link>
                </h2>
                <p>{course.shortDescription}</p>
                <ul className="meta-list">
                    {course.duration && <li>{course.duration}</li>}
                    {course.deliveryMode && <li>{course.deliveryMode}</li>}
                </ul>
                <div className="course-row__foot">
                    <Price
                        regularMinor={course.regularPriceMinor}
                        discountedMinor={course.discountedPriceMinor}
                        currency={course.currency}
                    />
                    <div className="actions">
                        <Button to={detailPath} variant="outline" size="sm">
                            Explore
                        </Button>
                        {course.registrationOpen ? (
                            <Button to={`${ROUTES.register}?course=${encodeURIComponent(course.slug)}`} size="sm">
                                Buy Now
                            </Button>
                        ) : (
                            <span className="muted">Registration closed</span>
                        )}
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
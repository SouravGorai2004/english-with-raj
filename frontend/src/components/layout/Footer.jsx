import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ROUTES } from '../../config/routes.js';
import './Footer.css';

const NAV = [
    { to: ROUTES.home, label: 'Home' },
    { to: ROUTES.about, label: 'About' },
    { to: ROUTES.courses, label: 'Courses' },
    { to: ROUTES.reviews, label: 'Reviews' },
    { to: ROUTES.gallery, label: 'Gallery' },
    { to: ROUTES.contact, label: 'Contact' },
];

export default function Footer() {
    const reduce = useReducedMotion();

    const rise = reduce
        ? {}
        : {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: '-20px' },
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        };

    return (
        <footer className="ft">
            <motion.div className="ft-mark" aria-hidden="true" {...rise}>
                English With Raj
            </motion.div>

            <nav className="ft-nav" aria-label="Footer navigation">
                <ul>
                    {NAV.map((item) => (
                        <li key={item.to}>
                            <Link to={item.to} className="ft-link">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </footer>
    );
}
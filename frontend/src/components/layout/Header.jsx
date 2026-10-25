import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../../theme/ThemeToggle.jsx';
import Button from '../ui/Button.jsx';
import { useSiteContent } from '../../hooks/SiteContentProvider.jsx';
import { ROUTES } from '../../config/routes.js';

const NAV = [
    { to: ROUTES.home, label: 'Home', end: true },
    { to: ROUTES.about, label: 'About' },
    { to: ROUTES.courses, label: 'Courses' },
    { to: ROUTES.reviews, label: 'Reviews' },
    { to: ROUTES.gallery, label: 'Gallery' },
    { to: ROUTES.contact, label: 'Contact' },
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();
    const { content } = useSiteContent();
    const logoUrl = content?.branding?.logoUrl;

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [open]);

    return (
        <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
            <div className="container site-header__inner">
                <Link to={ROUTES.home} className="brand" aria-label="English With Raj, home">
                    {logoUrl ? (
                        <img src={logoUrl} alt="English With Raj" height="40" />
                    ) : (
                        <span className="brand__word">
              English With <span>Raj</span>
            </span>
                    )}
                </Link>

                <nav id="primary-nav" className={`nav ${open ? 'is-open' : ''}`} aria-label="Primary">
                    <ul className="nav__list">
                        {NAV.map((item) => (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    end={item.end}
                                    className={({ isActive }) => `nav__link ${isActive ? 'active' : ''}`}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                        <li className="nav__cta">
                            <Button to={ROUTES.register}>Register Now</Button>
                        </li>
                    </ul>
                </nav>

                <div className="header-actions">
                    <Button to={ROUTES.register} size="sm">
                        Register Now
                    </Button>
                    <ThemeToggle />
                    <button
                        type="button"
                        className="icon-btn menu-toggle"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="primary-nav"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                    >
                        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
                    </button>
                </div>
            </div>
        </header>
    );
}
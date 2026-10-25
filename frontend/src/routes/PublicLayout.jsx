import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import SocialRail from '../components/layout/SocialRail.jsx';

export default function PublicLayout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [pathname]);

    return (
        <>
            <a className="skip-link" href="#main">Skip to content</a>
            <Header />
            <SocialRail />
            <main id="main" tabIndex={-1}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
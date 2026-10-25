import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import { ROUTES } from '../config/routes.js';

export default function NotFoundPage() {
    return (
        <section className="section">
            <Seo title="Page not found" noindex />
            <div className="container" style={{ maxWidth: 'var(--container-narrow)' }}>
                <span className="eyebrow">Error 404</span>
                <h1>This page doesn't exist.</h1>
                <p className="lead">The link may be broken or the page may have moved.</p>
                <Button to={ROUTES.home}>Back to home</Button>
            </div>
        </section>
    );
}
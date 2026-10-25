import { useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import Button from '../components/ui/Button.jsx';
import { ROUTES } from '../config/routes.js';

const COPY = {
    registration: {
        title: 'Registration request received',
        body: 'Thank you for registering your interest. We will contact you on the mobile number or email you provided to confirm the next steps. No payment has been taken.',
    },
    demo: {
        title: 'Demo class request received',
        body: 'Thank you. The date and time you chose are a request, not a confirmed slot. We will contact you to confirm the schedule.',
    },
    contact: {
        title: 'Message received',
        body: 'Thank you for writing to us. Your message has been received and we will get back to you.',
    },
    default: {
        title: 'Thank you',
        body: 'Your submission has been received.',
    },
};

export default function RegistrationSuccessPage() {
    const { state } = useLocation();
    const copy = COPY[state?.kind] || COPY.default;
    const showNote = typeof state?.note === 'string' && state.note.startsWith('Demo mode');

    return (
        <section className="section">
            <Seo title="Thank you" noindex />
            <div className="container" style={{ maxWidth: 'var(--container-narrow)' }}>
                <CheckCircle2 size={44} color="var(--success)" aria-hidden="true" />
                <h1 style={{ fontSize: 'var(--text-3xl)', marginTop: 'var(--space-4)' }} tabIndex={-1}>
                    {copy.title}
                </h1>
                <p className="lead">{copy.body}</p>
                {showNote && <p className="alert">{state.note}</p>}
                <div className="actions" style={{ marginTop: 'var(--space-5)' }}>
                    <Button to={ROUTES.home}>Back to home</Button>
                    <Button to={ROUTES.courses} variant="outline">
                        Browse courses
                    </Button>
                </div>
            </div>
        </section>
    );
}
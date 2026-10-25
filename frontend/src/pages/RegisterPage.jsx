import Seo from '../components/seo/Seo.jsx';
import RegistrationForm from '../features/registration/RegistrationForm.jsx';

export default function RegisterPage() {
    return (
        <>
            <Seo title="Register" description="Register for an English With Raj course." path="/register" />
            <section className="section">
                <div className="container form-layout">
                    <div>
                        <span className="eyebrow">Register</span>
                        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Start your registration.</h1>
                        <p className="lead">
                            Tell us which course you want and how to reach you. We will contact you to confirm the next steps.
                        </p>
                        <p className="muted">No payment is taken on this form.</p>
                    </div>
                    <RegistrationForm />
                </div>
            </section>
        </>
    );
}
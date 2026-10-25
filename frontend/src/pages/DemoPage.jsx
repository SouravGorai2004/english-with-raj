import Seo from '../components/seo/Seo.jsx';
import DemoForm from '../features/registration/DemoForm.jsx';

export default function DemoPage() {
    return (
        <>
            <Seo title="Book a Demo Class" description="Request a demo class with English With Raj." path="/book-demo" />
            <section className="section">
                <div className="container form-layout">
                    <div>
                        <span className="eyebrow">Demo class</span>
                        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Try a class before you decide.</h1>
                        <p className="lead">
                            Share the course you are curious about and when suits you. We will reach out to confirm a time.
                        </p>
                    </div>
                    <DemoForm />
                </div>
            </section>
        </>
    );
}
import Seo from '../components/seo/Seo.jsx';
import ContactForm from '../features/contact/ContactForm.jsx';
import SocialLinks from '../components/layout/SocialLinks.jsx';
import { useSiteContent } from '../hooks/SiteContentProvider.jsx';

export default function ContactPage() {
    const { content } = useSiteContent();
    const c = content?.contact || {};
    const whatsapp = (content?.social || []).find((s) => s.platform === 'whatsapp' && s.url);
    const hasDetails = c.phone || c.email || c.address || c.hours || whatsapp;

    return (
        <>
            <Seo title="Contact" description="Get in touch with Raj about courses, batches and demo classes." path="/contact" />
            <section className="section">
                <div className="container form-layout">
                    <div>
                        <span className="eyebrow">Contact</span>
                        <h1 style={{ fontSize: 'var(--text-3xl)' }}>Write to us. A real person reads it.</h1>
                        <p className="lead">
                            Not sure which course suits you, or have a question about batches and timings? Tell us what you are
                            looking for and we will help you work out the next step.
                        </p>

                        {hasDetails && (
                            <ul className="contact-list">
                                {c.phone && <li><strong>Phone</strong><a href={`tel:${c.phone}`}>{c.phone}</a></li>}
                                {whatsapp && <li><strong>WhatsApp</strong><a href={whatsapp.url} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></li>}
                                {c.email && <li><strong>Email</strong><a href={`mailto:${c.email}`}>{c.email}</a></li>}
                                {c.address && <li><strong>Address</strong><span>{c.address}</span></li>}
                                {c.hours && <li><strong>Office hours</strong><span>{c.hours}</span></li>}
                            </ul>
                        )}

                        <p className="muted">Helpful to include: the course you are considering, your current level, and the best time to reach you.</p>
                        <SocialLinks label="Follow us" />
                    </div>
                    <ContactForm />
                </div>
            </section>
        </>
    );
}

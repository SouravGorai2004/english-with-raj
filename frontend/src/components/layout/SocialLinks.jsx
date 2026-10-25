import { useSiteContent } from '../../hooks/SiteContentProvider.jsx';
import { BRAND, FALLBACK_BRAND, SocialIcon } from './SocialIcons.jsx';
import './SocialLinks.css';

export default function SocialLinks({ label = 'Social media' }) {
    const { content } = useSiteContent();
    const links = (content?.social || []).filter((l) => l.url);
    if (links.length === 0) return null;

    return (
        <ul className="sl" aria-label={label}>
            {links.map((link) => (
                <li key={link.platform}>
                    <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        style={{ '--brand': BRAND[link.platform] || FALLBACK_BRAND }}
                    >
                        <SocialIcon platform={link.platform} size={19} />
                    </a>
                </li>
            ))}
        </ul>
    );
}
import { Helmet } from 'react-helmet-async';
import { env } from '../../config/env.js';

const SITE_NAME = 'English With Raj';

export default function Seo({ title, description, path = '/', noindex = false }) {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const url = env.siteUrl ? `${env.siteUrl}${path}` : undefined;
    return (
        <Helmet>
            <title>{fullTitle}</title>
            {description && <meta name="description" content={description} />}
            {url && <link rel="canonical" href={url} />}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            {description && <meta property="og:description" content={description} />}
            {url && <meta property="og:url" content={url} />}
            <meta property="og:type" content="website" />
            {noindex && <meta name="robots" content="noindex,nofollow" />}
        </Helmet>
    );
}
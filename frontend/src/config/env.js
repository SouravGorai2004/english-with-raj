const dataSource = import.meta.env.VITE_DATA_SOURCE || 'http';

if (import.meta.env.PROD && dataSource !== 'http') {
    throw new Error(
        'Production build must use VITE_DATA_SOURCE=http. Mock data is not allowed in production.'
    );
}

export const env = {
    dataSource,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
    isProd: import.meta.env.PROD,
};
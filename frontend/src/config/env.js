const dataSource = import.meta.env.VITE_DATA_SOURCE || 'mock';

// Demo/mock content is allowed for Vercel preview or demo deployments.
// Set VITE_DATA_SOURCE=http in a real production backend-backed deployment.
export const env = {
    dataSource,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
    isProd: import.meta.env.PROD,
};

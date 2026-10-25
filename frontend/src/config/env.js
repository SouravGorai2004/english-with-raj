const dataSource = import.meta.env.VITE_DATA_SOURCE || 'mock';

// Demo/mock content is enabled by default for deploy previews and demo deployments.
// Set VITE_DATA_SOURCE=http only when your real backend is ready and reachable.
export const env = {
    dataSource,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
    isProd: import.meta.env.PROD,
};

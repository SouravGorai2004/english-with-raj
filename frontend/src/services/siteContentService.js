import { adapter } from './adapters/index.js';

export const siteContentService = {
    get: () => adapter.getSiteContent(),
};
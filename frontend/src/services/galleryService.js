import { adapter } from './adapters/index.js';

export const galleryService = {
    list: (params) => adapter.getGallery(params),
};
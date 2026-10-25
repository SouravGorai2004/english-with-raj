import { adapter } from './adapters/index.js';

export const reviewService = {
    list: (params) => adapter.getReviews(params),
};
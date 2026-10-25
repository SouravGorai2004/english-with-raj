import { adapter } from './adapters/index.js';

export const courseService = {
    list: (params) => adapter.getCourses(params),
    getBySlug: (slug) => adapter.getCourse(slug),
};
import { demo } from '../../data/demo.js';
import { ApiError } from '../errors.js';

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));
const clone = (value) => JSON.parse(JSON.stringify(value));

const submissions = { registrations: [], demos: [], enquiries: [] };

async function mockSubmit(bucket, payload) {
    await delay(600);
    if (payload.website) return { id: 'mock-ignored', status: 'NEW' }; // honeypot
    submissions[bucket].push({ ...payload, receivedAt: new Date().toISOString() });
    return {
        id: `mock-${bucket}-${submissions[bucket].length}`,
        status: 'NEW',
        message: 'Demo mode: this submission was not saved to a database.',
    };
}

export const mockAdapter = {
    async getCourses({ category, level } = {}) {
        await delay();
        let list = demo.courses.filter((c) => c.published);
        if (category) list = list.filter((c) => c.category === category);
        if (level) list = list.filter((c) => c.level === level);
        return clone({ items: list, page: 0, size: list.length, totalItems: list.length, totalPages: 1 });
    },
    async getCourse(slug) {
        await delay();
        const course = demo.courses.find((c) => c.slug === slug && c.published);
        if (!course) throw new ApiError('This course is not available.', { status: 404, code: 'NOT_FOUND' });
        return clone(course);
    },
    async getReviews({ type } = {}) {
        await delay();
        let list = demo.reviews.filter((r) => r.published);
        if (type) list = list.filter((r) => r.type === type);
        return clone({ items: list });
    },
    async getGallery({ category } = {}) {
        await delay();
        let list = demo.gallery.filter((g) => g.published);
        if (category) list = list.filter((g) => g.category === category);
        return clone({ items: list });
    },
    async getSiteContent() {
        await delay(150);
        return clone(demo.siteContent);
    },
    submitRegistration: (payload) => mockSubmit('registrations', payload),
    submitDemoBooking: (payload) => mockSubmit('demos', payload),
    submitContactEnquiry: (payload) => mockSubmit('enquiries', payload),
};
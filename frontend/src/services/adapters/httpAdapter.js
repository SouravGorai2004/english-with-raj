import { apiClient } from '../apiClient.js';

const unwrap = (res) => res.data;

export const httpAdapter = {
    getCourses: (params = {}) => apiClient.get('/courses', { params }).then(unwrap),
    getCourse: (slug) => apiClient.get(`/courses/${encodeURIComponent(slug)}`).then(unwrap),
    getReviews: (params = {}) => apiClient.get('/reviews', { params }).then(unwrap),
    getGallery: (params = {}) => apiClient.get('/gallery', { params }).then(unwrap),
    getSiteContent: () => apiClient.get('/site-content').then(unwrap),
    submitRegistration: (payload, idempotencyKey) =>
        apiClient
            .post('/registrations', payload, { headers: { 'Idempotency-Key': idempotencyKey } })
            .then(unwrap),
    submitDemoBooking: (payload, idempotencyKey) =>
        apiClient
            .post('/demo-bookings', payload, { headers: { 'Idempotency-Key': idempotencyKey } })
            .then(unwrap),
    submitContactEnquiry: (payload, idempotencyKey) =>
        apiClient
            .post('/contact-enquiries', payload, { headers: { 'Idempotency-Key': idempotencyKey } })
            .then(unwrap),
};
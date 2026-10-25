import { adapter } from './adapters/index.js';

export const registrationService = {
    registerForCourse: (payload, key) => adapter.submitRegistration(payload, key),
    requestDemo: (payload, key) => adapter.submitDemoBooking(payload, key),
    sendEnquiry: (payload, key) => adapter.submitContactEnquiry(payload, key),
};
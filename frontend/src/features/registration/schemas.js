import { z } from 'zod';

const clean = (raw) => String(raw || '').replace(/[\s\-()]/g, '');

export function isValidMobile(raw) {
    const c = clean(raw);
    if (c.startsWith('+91')) return /^\+91[6-9]\d{9}$/.test(c);
    if (c.startsWith('+')) return /^\+[1-9]\d{7,14}$/.test(c);
    return /^(91|0)?[6-9]\d{9}$/.test(c);
}

/** Returns E.164 format, assuming India (+91) when no country code is given. */
export function normalizeMobile(raw) {
    const c = clean(raw);
    if (c.startsWith('+')) return c;
    return `+91${c.slice(-10)}`;
}

const mobile = z
    .string()
    .trim()
    .min(1, 'Enter your mobile number.')
    .refine(isValidMobile, 'Enter a valid mobile number, for example 98765 43210.');

const email = z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address.')
    .max(160, 'Email address is too long.');

const consent = z.literal(true, {
    errorMap: () => ({ message: 'Please agree to continue.' }),
});

const optionalText = (max) => z.string().trim().max(max, `Please keep this under ${max} characters.`);

export const registrationSchema = z.object({
    fullName: z.string().trim().min(2, 'Enter your full name.').max(100, 'Name is too long.'),
    mobile,
    email,
    courseSlug: z.string().min(1, 'Choose a course.'),
    city: optionalText(100),
    preferredBatch: z.string(),
    message: optionalText(1000),
    consent,
    website: z.string().max(0).optional(),
});

export const demoSchema = z.object({
    name: z.string().trim().min(2, 'Enter your name.').max(100, 'Name is too long.'),
    mobile,
    email,
    courseSlug: z.string().min(1, 'Choose a course.'),
    preferredDate: z.string(),
    preferredTime: z.string(),
    message: optionalText(1000),
    consent,
    website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
    name: z.string().trim().min(2, 'Enter your name.').max(100, 'Name is too long.'),
    contact: z
        .string()
        .trim()
        .min(1, 'Enter your email address or mobile number.')
        .refine(
            (v) => z.string().email().safeParse(v).success || isValidMobile(v),
            'Enter a valid email address or mobile number.'
        ),
    subject: z.string().min(1, 'Choose a subject.'),
    message: z.string().trim().min(10, 'Please write at least 10 characters.').max(2000, 'Message is too long.'),
    website: z.string().max(0).optional(),
});

export const BATCH_OPTIONS = [
    { value: 'MORNING', label: 'Morning' },
    { value: 'AFTERNOON', label: 'Afternoon' },
    { value: 'EVENING', label: 'Evening' },
    { value: 'WEEKEND', label: 'Weekend' },
    { value: 'NO_PREFERENCE', label: 'No preference' },
];

export const DEMO_TIME_OPTIONS = [
    { value: 'MORNING', label: 'Morning' },
    { value: 'AFTERNOON', label: 'Afternoon' },
    { value: 'EVENING', label: 'Evening' },
    { value: 'ANY', label: 'Any time' },
];

export const CONTACT_SUBJECTS = [
    { value: 'Course information', label: 'Course information' },
    { value: 'Demo class', label: 'Demo class' },
    { value: 'Fees and batches', label: 'Fees and batches' },
    { value: 'Something else', label: 'Something else' },
];
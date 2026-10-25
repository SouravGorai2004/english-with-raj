/**
 * Content for the home page hero.
 * Every field is meant to become editable in the admin dashboard
 * (site setting "home.*"). Whatever the API sends under `home`
 * overrides these defaults field by field.
 *
 * imageUrl: use a photo of Raj with the background removed (transparent PNG or WebP)
 * so it stands freely on the page. It must be a different photo from the About page.
 */
export const HOME_DEFAULTS = {
    pill: 'Spoken English · Interview Prep · Communication',
    hi: "Hi, I'm Raj.",
    title: 'I transform how you speak English.',
    accent: 'speak English.',
    description:
        'Join structured English programs that take learners from foundation to fluency, communication mastery, and professional leadership.',
    primaryCta: 'Explore Courses',
    secondaryCta: 'Book a Demo Class',
    followLabel: 'Follow along',
    ghost: 'Raj',
    imageUrl: '/media/placeholders/raj-home.svg',
    imageAlt: 'Raj, founder of English With Raj',
};
/**
 * Default content for the About page.
 *
 * Every field here is meant to become editable in the admin dashboard
 * (stored as site setting "about.*"). Whatever the API returns for `about`
 * overrides these defaults field by field.
 *
 * IMPORTANT: confirm the highlights, journey steps and teaching-mode details
 * match how you really teach before publishing. Nothing here is a verified
 * statistic or a guarantee.
 */
export const ABOUT_DEFAULTS = {
    heading: 'Our Philosophy & Team',
    statement: 'Empowering ambitious minds to break speech limitations and lead with impact.',
    imageUrl: '/media/placeholders/raj-hero.svg',
    imageAlt: 'Raj, founder of English With Raj',
    founderHeading: "THE FOUNDER'S VISION",
    quote: 'Your Accent is a Signature, Your Confidence is the Ink.',
    story:
        'English With Raj was established after coaching ambitious candidates who wanted to improve their communication, confidence, and professional opportunities. Grammar is an important foundation, but effective communication also requires practical phrasing, confident body language, vocal presence, and the ability to listen actively.',

    // Short principles shown next to the founder story. icon = key from ICONS in AboutPage.jsx
    principles: [
        { icon: 'book', title: 'Grammar is the foundation', text: 'A solid base, never the finish line.' },
        { icon: 'message', title: 'Practical phrasing', text: 'Words and patterns you can use at work.' },
        { icon: 'ear', title: 'Presence and listening', text: 'Body language, voice and active listening.' },
    ],

    pillars: [
        {
            icon: 'mic',
            title: 'Interactive Extempore Focus Groups',
            text: 'Build confidence and reduce speaking anxiety through structured, live speaking practice and supportive feedback.',
        },
        {
            icon: 'book',
            title: 'Actionable Vocabulary Blueprints',
            text: 'Learn practical vocabulary, sentence patterns, and professional expressions that can be applied to everyday and workplace conversations.',
        },
        {
            icon: 'waves',
            title: 'Advanced Emotional Frequency Tuning',
            text: 'Develop awareness of tone, pitch, pacing, and delivery to communicate more clearly in important conversations.',
        },
    ],

    journeyHeading: 'How learning works here',
    journey: [
        { icon: 'compass', title: 'Know your level', text: 'We start by understanding where you are today.' },
        { icon: 'book', title: 'Learn the patterns', text: 'Short lessons on phrases, grammar and vocabulary.' },
        { icon: 'mic', title: 'Speak in every session', text: 'Live practice, not just listening.' },
        { icon: 'message', title: 'Get clear feedback', text: 'Specific points on what to fix next.' },
        { icon: 'trend', title: 'Use it for real', text: 'Apply it in interviews, meetings and daily life.' },
    ],

    modesHeading: 'Learn the way that suits you',
    modesNote: 'Which mode is available can vary by course and batch. Check the course page or contact us.',
    modes: [
        {
            id: 'online',
            icon: 'monitor',
            label: 'Online',
            title: 'Live classes from anywhere',
            text: 'Join interactive sessions from your own space and practise speaking with the group and with Raj.',
            points: ['Live, interactive sessions', 'Learn from home or while travelling', 'Speaking practice with feedback'],
        },
        {
            id: 'offline',
            icon: 'building',
            label: 'Offline',
            title: 'In-person classroom learning',
            text: 'Learn face to face, where body language, voice and group activities are easier to coach directly.',
            points: ['Face-to-face speaking circles', 'Direct coaching on posture and delivery', 'Group activities in the classroom'],
        },
    ],

    ctaTitle: 'Come and hear the difference yourself.',
    ctaText: 'Try a demo class or write to us with your questions.',
};
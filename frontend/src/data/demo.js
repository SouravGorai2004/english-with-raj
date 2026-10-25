/**
 * DEMONSTRATION CONTENT ONLY.
 * Every record here is fabricated for development. It is never used in
 * production builds (see config/env.js). Replace it through the admin dashboard.
 */

function art(w, h, c1, c2, label) {
    const size = Math.round(Math.min(w, h) * 0.06);
    const svg =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">` +
        `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
        `<stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs>` +
        `<rect width="${w}" height="${h}" fill="url(#g)"/>` +
        `<circle cx="${w * 0.78}" cy="${h * 0.24}" r="${Math.min(w, h) * 0.18}" fill="rgba(255,255,255,0.16)"/>` +
        `<circle cx="${w * 0.2}" cy="${h * 0.86}" r="${Math.min(w, h) * 0.28}" fill="rgba(255,255,255,0.1)"/>` +
        `<text x="50%" y="52%" font-family="Arial,sans-serif" font-size="${size}" text-anchor="middle" fill="rgba(255,255,255,0.88)">${label}</text>` +
        `</svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const galleryColors = [
    ['#c2410c', '#7c2d12'],
    ['#1d4ed8', '#312e81'],
    ['#047857', '#134e4a'],
    ['#be185d', '#6b21a8'],
    ['#b45309', '#78350f'],
    ['#0f766e', '#1e3a8a'],
    ['#9333ea', '#1e1b4b'],
    ['#dc2626', '#7f1d1d'],
];

const galleryShapes = [
    [1200, 800],
    [800, 1000],
    [1000, 1000],
    [1200, 800],
    [900, 1200],
    [1200, 800],
    [1000, 1000],
    [1200, 800],
    [800, 1000],
    [1200, 800],
    [1000, 1000],
    [1200, 800],
    [900, 1200],
    [1200, 800],
];

const galleryCategories = ['Classroom', 'Events', 'Students'];

export const demo = {
    siteContent: {
        isDemo: true,
        branding: { name: 'English With Raj', logoUrl: '' },
        hero: {
            headlineLead: "Hi, I'm Raj.",
            headline: 'I transform how you speak English.',
            description:
                'Join structured English programs that take learners from foundation to fluency, communication mastery, and professional leadership.',
            imageUrl: '/media/placeholders/raj-hero.svg',
            imageAlt: 'Raj, founder of English With Raj',
        },
        social: [
            // Demo URLs. Set real ones in the admin dashboard.
            { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/' },
            { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/' },
            { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/' },
            { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/' },
        ],
        contact: { phone: '', email: '', address: '', hours: '' },
        about: {
            heading: 'Our Philosophy & Team',
            statement: 'Empowering ambitious minds to break speech limitations and lead with impact.',
            // Reference photo: https://englishwithraj.com/assets/images/about-img.jpg
            // Use it here only after you confirm you have permission; otherwise upload your own.
            imageUrl: '/media/placeholders/raj-hero.svg',
            imageAlt: 'Raj, founder of English With Raj',
            founderHeading: "THE FOUNDER'S VISION",
            quote: 'Your Accent is a Signature, Your Confidence is the Ink.',
            story:
                'English With Raj was established after coaching ambitious candidates who wanted to improve their communication, confidence, and professional opportunities. Grammar is an important foundation, but effective communication also requires practical phrasing, confident body language, vocal presence, and the ability to listen actively.',
            pillars: [
                {
                    title: 'Interactive Extempore Focus Groups',
                    text: 'Build confidence and reduce speaking anxiety through structured, live speaking practice and supportive feedback.',
                },
                {
                    title: 'Actionable Vocabulary Blueprints',
                    text: 'Learn practical vocabulary, sentence patterns, and professional expressions that can be applied to everyday and workplace conversations.',
                },
                {
                    title: 'Advanced Emotional Frequency Tuning',
                    text: 'Develop awareness of tone, pitch, pacing, and delivery to communicate more clearly in important conversations.',
                },
            ],
        },
        // Drafts only. Change verified to true for each figure once you have confirmed it.
        stats: [
            { label: 'Happy Students', value: '20K+', verified: false },
            { label: 'Open Batches', value: '50+', verified: false },
            { label: 'Video Lectures', value: '1000+', verified: false },
            { label: 'Annual Rating', value: '4.9', verified: false },
        ],
    },

    courses: [
        {
            isDemo: true,
            id: 1,
            slug: 'spoken-english-foundation',
            title: 'Spoken English Foundation',
            category: 'Spoken English',
            level: 'Beginner',
            shortDescription: 'Build speaking basics, everyday vocabulary and sentence confidence.',
            fullDescription:
                'A structured beginner programme that takes you from hesitant sentences to confident everyday conversation. Every week combines short lessons, guided speaking practice and personal feedback, so you use the language instead of only studying it.',
            imageUrl: art(1200, 900, '#c2410c', '#7c2d12', 'Demo course image'),
            imageAlt: 'Course illustration placeholder',
            regularPriceMinor: 500000,
            discountedPriceMinor: 400000,
            currency: 'INR',
            duration: '8 weeks',
            batchInfo: 'Demo batch info',
            deliveryMode: 'Online live classes',
            audience:
                'Learners who understand some English but hesitate to speak, and anyone restarting their spoken English journey.',
            learningOutcomes: [
                'Form clear, correct sentences for everyday situations',
                'Speak with growing confidence and less hesitation',
                'Use practical vocabulary for daily and workplace talk',
                'Improve pronunciation of common sounds and words',
                'Introduce yourself and hold a short conversation',
                'Understand spoken English at a natural pace',
            ],
            syllabus: [
                { title: 'Foundations of speaking', topics: ['Sentence patterns', 'Daily vocabulary', 'Common mistakes'] },
                { title: 'Pronunciation and rhythm', topics: ['Key sounds', 'Word stress', 'Natural pacing'] },
                { title: 'Conversation practice', topics: ['Asking and answering', 'Small talk', 'Role plays'] },
                { title: 'Confidence in action', topics: ['Short talks', 'Group speaking', 'Personal feedback'] },
            ],
            features: ['Live interactive sessions', 'Guided speaking practice', 'Personal feedback', 'Practice material'],
            faqs: [
                { question: 'Is there a demo class?', answer: 'Yes. You can request a demo class before you register.' },
                { question: 'Do I need prior knowledge?', answer: 'Basic understanding of English is enough to begin.' },
                { question: 'Will I get recordings?', answer: 'This is demo content. Add the real answer in the admin dashboard.' },
            ],
            registrationOpen: true,
            published: true,
        },
        {
            isDemo: true,
            id: 2,
            slug: 'interview-preparation',
            title: 'Interview Preparation',
            category: 'Career',
            level: 'Intermediate',
            shortDescription: 'Practise interview answers, delivery and professional expressions.',
            fullDescription:
                'Mock interviews, answer frameworks and feedback on tone and delivery. You rehearse the questions that actually come up, then refine how you sound, so your preparation shows in the room.',
            imageUrl: art(1200, 900, '#1d4ed8', '#312e81', 'Demo course image'),
            imageAlt: 'Course illustration placeholder',
            regularPriceMinor: 600000,
            discountedPriceMinor: null,
            currency: 'INR',
            duration: '6 weeks',
            batchInfo: 'Demo batch info',
            deliveryMode: 'Online live classes',
            audience: 'Job seekers and professionals preparing for interviews in English.',
            learningOutcomes: [
                'Structure strong answers to common questions',
                'Introduce yourself clearly and confidently',
                'Handle difficult and unexpected questions',
                'Use professional expressions naturally',
                'Control tone, pace and body language',
                'Ask thoughtful questions at the end',
            ],
            syllabus: [
                { title: 'Your story', topics: ['Self-introduction', 'Strengths and goals'] },
                { title: 'Answer frameworks', topics: ['Behavioural questions', 'Situation answers'] },
                { title: 'Mock interviews', topics: ['Live practice', 'Recorded review'] },
            ],
            features: ['Mock interviews', 'Personal feedback', 'Answer templates'],
            faqs: [],
            registrationOpen: true,
            published: true,
        },
        {
            isDemo: true,
            id: 3,
            slug: 'communication-and-personality',
            title: 'Communication & Personality Development',
            category: 'Personality',
            level: 'Advanced',
            shortDescription: 'Work on tone, pacing, presence and confident delivery.',
            fullDescription:
                'Advanced practice in tone, pitch, pacing and active listening. This course is for people who already speak well and want their delivery to carry more weight in meetings, presentations and leadership conversations.',
            imageUrl: art(1200, 900, '#047857', '#134e4a', 'Demo course image'),
            imageAlt: 'Course illustration placeholder',
            regularPriceMinor: 800000,
            discountedPriceMinor: 700000,
            currency: 'INR',
            duration: '10 weeks',
            batchInfo: 'Demo batch info',
            deliveryMode: 'Online live classes',
            audience: 'Professionals and aspiring leaders who want stronger presence and persuasion.',
            learningOutcomes: [
                'Control tone, pitch and pacing deliberately',
                'Listen actively and respond with clarity',
                'Present ideas with structure and presence',
                'Handle pressure in important conversations',
            ],
            syllabus: [
                { title: 'Voice and delivery', topics: ['Pacing', 'Pitch', 'Pauses'] },
                { title: 'Presence', topics: ['Body language', 'Eye contact'] },
                { title: 'Persuasion', topics: ['Structuring arguments', 'Handling objections'] },
            ],
            features: ['Extempore groups', 'Recorded feedback', 'Presentation practice'],
            faqs: [{ question: 'Is this course for beginners?', answer: 'It is designed for advanced learners.' }],
            registrationOpen: true,
            published: true,
        },
    ],

    reviews: [
        ...[
            ['Demo Student A', 'Demo course', '#c2410c', '#7c2d12'],
            ['Demo Student B', 'Demo batch', '#1d4ed8', '#312e81'],
            ['Demo Student C', 'Demo course', '#047857', '#134e4a'],
            ['Demo Student D', 'Demo batch', '#be185d', '#6b21a8'],
            ['Demo Student E', 'Demo course', '#b45309', '#78350f'],
        ].map(([name, batch, c1, c2], i) => ({
            isDemo: true,
            id: 100 + i,
            type: 'VIDEO',
            studentName: name,
            courseOrBatch: batch,
            achievement: null,
            caption: 'Demo video placeholder',
            videoUrl: '', // add a real video URL in the admin dashboard
            posterUrl: art(720, 1280, c1, c2, 'Demo reel'),
            published: true,
        })),
        {
            isDemo: true,
            id: 1,
            type: 'TEXT',
            studentName: 'Demo Student A',
            courseOrBatch: 'Demo course',
            body: 'Placeholder review text used only to preview the layout. Replace it with an approved student review in the admin dashboard.',
            rating: 5,
            published: true,
        },
        {
            isDemo: true,
            id: 2,
            type: 'TEXT',
            studentName: 'Demo Student B',
            courseOrBatch: 'Demo batch',
            body: 'A second placeholder review so you can see how several written reviews are laid out on the page. Real reviews will be longer or shorter than this one.',
            rating: 4,
            published: true,
        },
        {
            isDemo: true,
            id: 3,
            type: 'TEXT',
            studentName: 'Demo Student C',
            courseOrBatch: 'Demo course',
            body: 'Short placeholder review.',
            rating: null,
            published: true,
        },
        {
            isDemo: true,
            id: 4,
            type: 'TEXT',
            studentName: 'Demo Student D',
            courseOrBatch: 'Demo batch',
            body: 'This is a longer placeholder review. It exists to show how the cards stack when the text is a few lines long, so the layout can be judged before any real student feedback is added by the administrator.',
            rating: 5,
            published: true,
        },
        {
            isDemo: true,
            id: 5,
            type: 'TEXT',
            studentName: 'Demo Student E',
            courseOrBatch: 'Demo course',
            body: 'Another placeholder review for layout testing only.',
            rating: null,
            published: true,
        },
        {
            isDemo: true,
            id: 6,
            type: 'TEXT',
            studentName: 'Demo Student F',
            courseOrBatch: 'Demo batch',
            body: 'A medium-length placeholder review that helps the masonry layout look natural while you are still developing the site.',
            rating: 4,
            published: true,
        },
    ],

    gallery: galleryShapes.map(([w, h], i) => {
        const [c1, c2] = galleryColors[i % galleryColors.length];
        return {
            isDemo: true,
            id: i + 1,
            mediaType: 'IMAGE',
            url: art(w, h, c1, c2, `Demo image ${i + 1}`),
            posterUrl: null,
            width: w,
            height: h,
            title: `Demo image ${i + 1}`,
            caption: `Demo image ${i + 1}`,
            altText: 'Placeholder image for layout preview',
            category: galleryCategories[i % galleryCategories.length],
            published: true,
        };
    }),
};
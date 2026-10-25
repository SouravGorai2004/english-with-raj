import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from './PublicLayout.jsx';
import { LoadingState } from '../components/ui/States.jsx';

// Fails with a readable message that names the file when a page has no default export.
const page = (name, loader) =>
    lazy(() =>
        loader().then((mod) => {
            if (!mod || typeof mod.default !== 'function') {
                throw new Error(
                    `PAGE FILE PROBLEM: src/pages/${name}.jsx has no "export default function". The file is empty or incomplete. Paste the full code again.`
                );
            }
            return mod;
        })
    );

const HomePage = page('HomePage', () => import('../pages/HomePage.jsx'));
const AboutPage = page('AboutPage', () => import('../pages/AboutPage.jsx'));
const CoursesPage = page('CoursesPage', () => import('../pages/CoursesPage.jsx'));
const CourseDetailPage = page('CourseDetailPage', () => import('../pages/CourseDetailPage.jsx'));
const ReviewsPage = page('ReviewsPage', () => import('../pages/ReviewsPage.jsx'));
const GalleryPage = page('GalleryPage', () => import('../pages/GalleryPage.jsx'));
const ContactPage = page('ContactPage', () => import('../pages/ContactPage.jsx'));
const RegisterPage = page('RegisterPage', () => import('../pages/RegisterPage.jsx'));
const DemoPage = page('DemoPage', () => import('../pages/DemoPage.jsx'));
const RegistrationSuccessPage = page('RegistrationSuccessPage', () =>
    import('../pages/RegistrationSuccessPage.jsx')
);
const NotFoundPage = page('NotFoundPage', () => import('../pages/NotFoundPage.jsx'));

export default function AppRoutes() {
    return (
        <Suspense fallback={<LoadingState />}>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="courses" element={<CoursesPage />} />
                    <Route path="courses/:slug" element={<CourseDetailPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route path="gallery" element={<GalleryPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="book-demo" element={<DemoPage />} />
                    <Route path="registration-success" element={<RegistrationSuccessPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}
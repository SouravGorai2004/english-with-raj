import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckboxField, SelectField, TextAreaField, TextField } from '../../components/ui/Field.jsx';
import { ErrorState, LoadingState } from '../../components/ui/States.jsx';
import { registrationService } from '../../services/registrationService.js';
import { applyFieldErrors, useFormSubmit } from '../../hooks/useFormSubmit.js';
import { DEMO_TIME_OPTIONS, demoSchema, normalizeMobile } from './schemas.js';
import { useCourseOptions } from './useCourseOptions.js';
import { ROUTES } from '../../config/routes.js';

function todayLocal() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function DemoForm() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { options, loading, error: loadError, reload } = useCourseOptions();
    const { submit, submitting, error } = useFormSubmit(registrationService.requestDemo);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(demoSchema),
        defaultValues: {
            name: '',
            mobile: '',
            email: '',
            courseSlug: params.get('course') || '',
            preferredDate: '',
            preferredTime: '',
            message: '',
            consent: false,
            website: '',
        },
    });

    if (loading) return <LoadingState label="Loading courses…" />;
    if (loadError) return <ErrorState error={loadError} onRetry={reload} />;

    const onSubmit = async (values) => {
        const outcome = await submit({
            name: values.name.trim(),
            mobile: normalizeMobile(values.mobile),
            email: values.email.trim(),
            courseSlug: values.courseSlug,
            preferredDate: values.preferredDate || null,
            preferredTime: values.preferredTime || null,
            message: values.message.trim() || null,
            consent: true,
            website: values.website || '',
        });
        if (outcome.ok) {
            navigate(ROUTES.registrationSuccess, {
                replace: true,
                state: { kind: 'demo', note: outcome.result?.message },
            });
        } else if (outcome.error) {
            applyFieldErrors(outcome.error, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Book a demo class">
            {error && (
                <div className="alert alert--error" role="alert" style={{ marginBottom: 'var(--space-5)' }}>
                    {error.message}
                </div>
            )}

            <div className="form-grid">
                <div className="span-2">
                    <TextField label="Your name" autoComplete="name" error={errors.name?.message} {...register('name')} />
                </div>
                <TextField
                    label="Mobile number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    error={errors.mobile?.message}
                    {...register('mobile')}
                />
                <TextField label="Email address" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
                <div className="span-2">
                    <SelectField
                        label="Course you're interested in"
                        options={options}
                        placeholder="Choose a course"
                        error={errors.courseSlug?.message}
                        {...register('courseSlug')}
                    />
                </div>
                <TextField
                    label="Preferred date"
                    optional
                    type="date"
                    min={todayLocal()}
                    error={errors.preferredDate?.message}
                    {...register('preferredDate')}
                />
                <SelectField
                    label="Preferred time"
                    optional
                    options={DEMO_TIME_OPTIONS}
                    placeholder="No selection"
                    error={errors.preferredTime?.message}
                    {...register('preferredTime')}
                />
                <div className="span-2">
                    <TextAreaField label="Message" optional error={errors.message?.message} {...register('message')} />
                </div>
            </div>

            <p className="field__hint" style={{ marginBottom: 'var(--space-5)' }}>
                Your date and time are a request. The slot is confirmed only after we contact you.
            </p>

            <div className="hp" aria-hidden="true">
                <label>
                    Website
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </label>
            </div>

            <CheckboxField error={errors.consent?.message} {...register('consent')}>
                I agree to be contacted about this demo request and for my details to be used only for that purpose.
            </CheckboxField>

            <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Request demo class'}
            </button>
        </form>
    );
}
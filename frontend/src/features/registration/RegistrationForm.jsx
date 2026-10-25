import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckboxField, SelectField, TextAreaField, TextField } from '../../components/ui/Field.jsx';
import { ErrorState, LoadingState } from '../../components/ui/States.jsx';
import { registrationService } from '../../services/registrationService.js';
import { applyFieldErrors, useFormSubmit } from '../../hooks/useFormSubmit.js';
import { BATCH_OPTIONS, normalizeMobile, registrationSchema } from './schemas.js';
import { useCourseOptions } from './useCourseOptions.js';
import { ROUTES } from '../../config/routes.js';

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const { options, loading, error: loadError, reload } = useCourseOptions();
    const { submit, submitting, error } = useFormSubmit(registrationService.registerForCourse);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            fullName: '',
            mobile: '',
            email: '',
            courseSlug: params.get('course') || '',
            city: '',
            preferredBatch: '',
            message: '',
            consent: false,
            website: '',
        },
    });

    if (loading) return <LoadingState label="Loading courses…" />;
    if (loadError) return <ErrorState error={loadError} onRetry={reload} />;

    const onSubmit = async (values) => {
        const outcome = await submit({
            type: 'COURSE',
            fullName: values.fullName.trim(),
            mobile: normalizeMobile(values.mobile),
            email: values.email.trim(),
            courseSlug: values.courseSlug,
            city: values.city.trim() || null,
            preferredBatch: values.preferredBatch || null,
            message: values.message.trim() || null,
            consent: true,
            website: values.website || '',
        });
        if (outcome.ok) {
            navigate(ROUTES.registrationSuccess, {
                replace: true,
                state: { kind: 'registration', note: outcome.result?.message },
            });
        } else if (outcome.error) {
            applyFieldErrors(outcome.error, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Course registration">
            {error && (
                <div className="alert alert--error" role="alert" style={{ marginBottom: 'var(--space-5)' }}>
                    {error.message}
                </div>
            )}

            <div className="form-grid">
                <div className="span-2">
                    <TextField label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
                </div>
                <TextField
                    label="Mobile number"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    hint="Indian numbers need no country code."
                    error={errors.mobile?.message}
                    {...register('mobile')}
                />
                <TextField
                    label="Email address"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    {...register('email')}
                />
                <div className="span-2">
                    <SelectField
                        label="Course"
                        options={options}
                        placeholder="Choose a course"
                        error={errors.courseSlug?.message}
                        {...register('courseSlug')}
                    />
                </div>
                <TextField label="City" optional autoComplete="address-level2" error={errors.city?.message} {...register('city')} />
                <SelectField
                    label="Preferred batch timing"
                    optional
                    options={BATCH_OPTIONS}
                    placeholder="No selection"
                    error={errors.preferredBatch?.message}
                    {...register('preferredBatch')}
                />
                <div className="span-2">
                    <TextAreaField label="Additional message" optional error={errors.message?.message} {...register('message')} />
                </div>
            </div>

            <div className="hp" aria-hidden="true">
                <label>
                    Website
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </label>
            </div>

            <CheckboxField error={errors.consent?.message} {...register('consent')}>
                I agree to be contacted about this registration and for my details to be used only for that purpose.
            </CheckboxField>

            <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit registration'}
            </button>
        </form>
    );
}
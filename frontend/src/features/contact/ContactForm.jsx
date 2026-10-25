import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { SelectField, TextAreaField, TextField } from '../../components/ui/Field.jsx';
import { registrationService } from '../../services/registrationService.js';
import { applyFieldErrors, useFormSubmit } from '../../hooks/useFormSubmit.js';
import { CONTACT_SUBJECTS, contactSchema } from '../registration/schemas.js';
import { ROUTES } from '../../config/routes.js';

export default function ContactForm() {
    const navigate = useNavigate();
    const { submit, submitting, error } = useFormSubmit(registrationService.sendEnquiry);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(contactSchema),
        defaultValues: { name: '', contact: '', subject: '', message: '', website: '' },
    });

    const onSubmit = async (values) => {
        const outcome = await submit({
            name: values.name.trim(),
            contact: values.contact.trim(),
            subject: values.subject,
            message: values.message.trim(),
            website: values.website || '',
        });
        if (outcome.ok) {
            navigate(ROUTES.registrationSuccess, {
                replace: true,
                state: { kind: 'contact', note: outcome.result?.message },
            });
        } else if (outcome.error) {
            applyFieldErrors(outcome.error, setError);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
            {error && (
                <div className="alert alert--error" role="alert" style={{ marginBottom: 'var(--space-5)' }}>
                    {error.message}
                </div>
            )}

            <div className="form-grid">
                <TextField label="Your name" autoComplete="name" error={errors.name?.message} {...register('name')} />
                <TextField
                    label="Email or mobile number"
                    autoComplete="email"
                    error={errors.contact?.message}
                    {...register('contact')}
                />
                <div className="span-2">
                    <SelectField
                        label="Subject"
                        options={CONTACT_SUBJECTS}
                        placeholder="Choose a subject"
                        error={errors.subject?.message}
                        {...register('subject')}
                    />
                </div>
                <div className="span-2">
                    <TextAreaField label="Message" rows={6} error={errors.message?.message} {...register('message')} />
                </div>
            </div>

            <div className="hp" aria-hidden="true">
                <label>
                    Website
                    <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                </label>
            </div>

            <button type="submit" className="btn btn--primary" disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
            </button>
        </form>
    );
}
import { useCallback, useRef, useState } from 'react';

function newKey() {
    if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * Wraps a submit function with a double-submit guard and an idempotency key.
 * Returns { ok: true, result } or { ok: false, error } from submit().
 */
export function useFormSubmit(submitFn) {
    const keyRef = useRef(newKey());
    const inFlight = useRef(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const submit = useCallback(
        async (payload) => {
            if (inFlight.current) return { ok: false, error: null };
            inFlight.current = true;
            setSubmitting(true);
            setError(null);
            try {
                const result = await submitFn(payload, keyRef.current);
                keyRef.current = newKey();
                return { ok: true, result };
            } catch (e) {
                setError(e);
                return { ok: false, error: e };
            } finally {
                inFlight.current = false;
                setSubmitting(false);
            }
        },
        [submitFn]
    );

    return { submit, submitting, error };
}

/** Copies server-side field errors onto react-hook-form fields. */
export function applyFieldErrors(error, setError) {
    (error?.fieldErrors || []).forEach(({ field, message }) => {
        setError(field, { type: 'server', message });
    });
}
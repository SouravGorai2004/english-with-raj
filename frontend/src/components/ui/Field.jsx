import { forwardRef, useId } from 'react';

function Shell({ id, label, optional, hint, error, children }) {
    return (
        <div className="field">
            <label htmlFor={id}>
                {label}
                {optional && <span className="optional"> (optional)</span>}
            </label>
            {children}
            {hint && !error && (
                <p className="field__hint" id={`${id}-hint`}>
                    {hint}
                </p>
            )}
            {error && (
                <p className="field__error" id={`${id}-error`} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
}

const describe = (id, hint, error) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export const TextField = forwardRef(function TextField(
    { label, optional, hint, error, ...rest },
    ref
) {
    const id = useId();
    return (
        <Shell id={id} label={label} optional={optional} hint={hint} error={error}>
            <input
                id={id}
                ref={ref}
                aria-invalid={!!error}
                aria-required={!optional}
                aria-describedby={describe(id, hint, error)}
                {...rest}
            />
        </Shell>
    );
});

export const SelectField = forwardRef(function SelectField(
    { label, optional, hint, error, options, placeholder = 'Select…', ...rest },
    ref
) {
    const id = useId();
    return (
        <Shell id={id} label={label} optional={optional} hint={hint} error={error}>
            <select
                id={id}
                ref={ref}
                aria-invalid={!!error}
                aria-required={!optional}
                aria-describedby={describe(id, hint, error)}
                {...rest}
            >
                <option value="">{placeholder}</option>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </Shell>
    );
});

export const TextAreaField = forwardRef(function TextAreaField(
    { label, optional, hint, error, rows = 4, ...rest },
    ref
) {
    const id = useId();
    return (
        <Shell id={id} label={label} optional={optional} hint={hint} error={error}>
      <textarea
          id={id}
          ref={ref}
          rows={rows}
          aria-invalid={!!error}
          aria-required={!optional}
          aria-describedby={describe(id, hint, error)}
          {...rest}
      />
        </Shell>
    );
});

export const CheckboxField = forwardRef(function CheckboxField({ error, children, ...rest }, ref) {
    const id = useId();
    return (
        <div className="field">
            <div className="check">
                <input
                    id={id}
                    type="checkbox"
                    ref={ref}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    {...rest}
                />
                <label htmlFor={id}>{children}</label>
            </div>
            {error && (
                <p className="field__error" id={`${id}-error`} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
});
export function LoadingState({ label = 'Loading…' }) {
    return (
        <div className="state" role="status" aria-live="polite">
            {label}
        </div>
    );
}

export function EmptyState({ title = 'Nothing to show yet', children }) {
    return (
        <div className="state">
            <h3>{title}</h3>
            {children && <p>{children}</p>}
        </div>
    );
}

export function ErrorState({ error, onRetry }) {
    return (
        <div className="state" role="alert">
            <h3>We couldn't load this</h3>
            <p>{error?.message || 'Something went wrong.'}</p>
            {onRetry && (
                <button type="button" className="btn btn--outline btn--sm" onClick={onRetry}>
                    Try again
                </button>
            )}
        </div>
    );
}
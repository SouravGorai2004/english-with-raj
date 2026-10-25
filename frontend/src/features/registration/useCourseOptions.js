import { useMemo } from 'react';
import { useAsync } from '../../hooks/useAsync.js';
import { courseService } from '../../services/courseService.js';

export function useCourseOptions() {
    const { data, loading, error, reload } = useAsync(() => courseService.list(), []);
    const options = useMemo(
        () =>
            (data?.items || [])
                .filter((c) => c.registrationOpen)
                .map((c) => ({ value: c.slug, label: c.title })),
        [data]
    );
    return { options, loading, error, reload };
}
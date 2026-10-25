import { createContext, useContext } from 'react';
import { useAsync } from './useAsync.js';
import { siteContentService } from '../services/siteContentService.js';

const SiteContentContext = createContext({ content: null, loading: true, error: null });

export function SiteContentProvider({ children }) {
    const { data, loading, error } = useAsync(() => siteContentService.get(), []);
    return (
        <SiteContentContext.Provider value={{ content: data, loading, error }}>
            {children}
        </SiteContentContext.Provider>
    );
}

export function useSiteContent() {
    return useContext(SiteContentContext);
}
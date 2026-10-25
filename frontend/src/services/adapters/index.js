import { env } from '../../config/env.js';
import { httpAdapter } from './httpAdapter.js';
import { mockAdapter } from './mockAdapter.js';

// Use the demo/mock adapter by default so deployed previews keep working without a live backend.
// Switch to HTTP only when you explicitly set VITE_DATA_SOURCE=http.
export const adapter = env.dataSource === 'mock' ? mockAdapter : httpAdapter;

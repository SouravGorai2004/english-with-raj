import { env } from '../../config/env.js';
import { httpAdapter } from './httpAdapter.js';
import { mockAdapter } from './mockAdapter.js';

export const adapter = env.dataSource === 'mock' && !env.isProd ? mockAdapter : httpAdapter;
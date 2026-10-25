export class ApiError extends Error {
    constructor(message, { status = 0, code = 'UNKNOWN', fieldErrors = [] } = {}) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.code = code;
        this.fieldErrors = fieldErrors;
    }
}

export class NetworkError extends ApiError {
    constructor() {
        super('Unable to reach the server. Please check your connection and try again.', {
            code: 'NETWORK',
        });
        this.name = 'NetworkError';
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = 'Your session has expired. Please sign in again.') {
        super(message, { status: 401, code: 'UNAUTHORIZED' });
        this.name = 'UnauthorizedError';
    }
}
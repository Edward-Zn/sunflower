// frontend/src/utils/logger.js
import log from 'loglevel';

// Set log level (trace, debug, info, warn, error, silent)
log.setLevel('info');

// Example usage
log.info('This is an info message');
log.error('This is an error message');

export default log;

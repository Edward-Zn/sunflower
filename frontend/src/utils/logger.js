// frontend/src/utils/logger.js
import log from 'loglevel';

// Set log level (trace, debug, info, warn, error, silent)
log.setLevel('info');

// Test usage
log.info('Info level. Test message');
log.error('Error level. Test message');
log.debug('Debug level. Test message');

export default log;

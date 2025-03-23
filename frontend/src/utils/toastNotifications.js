import { toast } from "react-toastify";

// Success message
export const showSuccess = (message) => toast.success(message);

// Error message
export const showError = (message) => toast.error(message);

// Info message
export const showInfo = (message) => toast.info(message);

// Warning message
export const showWarning = (message) => toast.warn(message);
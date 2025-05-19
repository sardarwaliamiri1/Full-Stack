export const errorHandler = (message, statusCode) => {
      const error = new Error();
      error.message = message || 'Internal Server Error';
      error.statusCode = statusCode;
      return error;
}
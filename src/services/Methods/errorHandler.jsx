export const errorHandler = error => {
  if (error.response) {
    return error.response.data.error
      ? error.response.data.error
      : error.response.data.message;
  } else if (error.request) {
    return error.message;
  } else {
    return error.message;
  }
};

import axios, { AxiosError } from 'axios';

enum AxiosCode {
  TimeoutError = 'ECONNABORTED',
}

const isErrorResponse = (error: unknown): error is AxiosError<{ message: string }> =>
  axios.isAxiosError(error) && typeof error.response?.data === 'object' && typeof (error.response?.data as { message: string }).message === 'string';

const extractMessage = (error: unknown) => {
  if (isErrorResponse(error) && error.response) {
    return error.response.data.message;
  }

  if (axios.isAxiosError(error) && error.code === AxiosCode.TimeoutError) {
    return 'Error connecting to server. Please check your connection and contact support if issues persist.';
  }

  return error instanceof Error ? error.message : 'Unknown error';
};

export {
  AxiosCode, 
  isErrorResponse,
  extractMessage,
};
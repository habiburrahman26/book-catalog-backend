export type ErrorMessage = {
  path: string;
  message: string;
};

export type ErrorApiResponseType = {
  success: boolean;
  message: string;
  errorMessages: ErrorMessage[];
  stack?: string;
};

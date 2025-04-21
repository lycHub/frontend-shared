interface Options {
  code: number;
}

const ERROR_CODES = {
  UNKNOWN: -1,
  NETWORK: -100,
  VALIDATION: -200,
};

export function formatError(error: Error, options?: Partial<Options>) {
  const baseError = {
    code: options?.code ?? ERROR_CODES.UNKNOWN,
    message: "An unknown error occurred",
    type: "UnknownError",
    stack: null,
    error: null,
    context: null,
  };

  if (!(error instanceof Error)) {
    return { ...baseError, error };
  }

  const result = {
    ...baseError,
    code: options?.code,
    message: error.message,
    error: error,
    type: error.name || "Error",
    stack: error.stack,
  };

  return result;
}

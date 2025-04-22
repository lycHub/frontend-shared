import { isPlainObject } from "lodash-es";

const DefaultErrorConfig = {
  UNKNOWN: {
    code: "unknown",
    type: "UnknownError",
    message: "An unknown error occurred",
    error: null,
    stack: null,
  },
};

export function formatError(error: any) {
  const finalError = {
    ...DefaultErrorConfig.UNKNOWN,
    error,
  };

  if (isPlainObject(error)) {
    const code = error.code ?? error.status;
    if (code) {
      finalError.code = code;
    }
    const message = error.message ?? error.msg;
    if (message) {
      finalError.message = message;
    }
    if (error.type) {
      finalError.type = error.type;
    }
    if (error.stack) {
      finalError.stack = error.stack;
    }
  }

  return finalError;
}

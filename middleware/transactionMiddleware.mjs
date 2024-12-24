export const withTransaction = (startFn, endFn) => {
  return async (serviceFn) => {
    return async (...args) => {
      const context = {};
      try {
        if (startFn) await startFn(...args);

        const result = await serviceFn(...args, context);

        if (endFn) await endFn(null, ...args, context);

        return result;
      } catch (error) {
        if (endFn) await endFn(error, ...args, context);
        throw error;
      }
    };
  };
};

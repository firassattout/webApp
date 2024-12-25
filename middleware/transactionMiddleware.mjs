export const withTransaction = (startFn, endFn) => {
  return async (serviceFn) => {
    return async (...args) => {
      const context = {};
      const session = await startFn();
      context.session = session;
      try {
        const result = await serviceFn(...args, context);
        await endFn(null, context);
        return result;
      } catch (err) {
        await endFn(err, context);
        return { message: err.message };
      } finally {
        session.endSession();
      }
    };
  };
};

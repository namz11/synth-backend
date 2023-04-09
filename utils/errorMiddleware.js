const errorLogger = (error, req, res, next) => {
  // log error
  console.error(error);
  next(error); // forward to next middleware
};

const errorHandler = async (error, req, res, next) => {
  // handle custom errors here
  next(error); // forward to generic handler
};

const failSafeHandler = (error, req, res, next) => {
  // generic handler
  res.status(500).json({
    success: false,
    message: error?.message || error || "Something went wrong!",
  });
};

export { errorLogger, errorHandler, failSafeHandler };

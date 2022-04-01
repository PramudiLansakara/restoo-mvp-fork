const config = require('../config')

module.exports = () => (req, res, next) => {
  if (
   req.headers["x-forwarded-proto"] !== "https" &&
   config.forceHttps
  ) {
    res.redirect(`https://${req.hostname}${req.url}`);
  } else {
    // Continue to other routes if we're not redirecting
    next();
  }
};

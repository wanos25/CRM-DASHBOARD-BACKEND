import rateLimit from 'express-rate-limit';
const max = Number(process.env.RATE_LIMIT_MAX || 100);
export default rateLimit({
  windowMs: 15 * 60 * 1000,
  max,
  standardHeaders: true,
  legacyHeaders: false
});

export const inputCleaner = (req, res, next) => {
  if (req.body) {
    if (typeof req.body.username === 'string') {
      req.body.username = req.body.username.toLowerCase();
    }
    if (typeof req.body.comment === 'string') {
      req.body.comment = req.body.comment.replace(/<[^>]*>/g, '');
    }
  }
  next();
};

export const inputValidator = (req, res, next) => {
  const username = req.body?.username || req.query?.username;

  if (!username || username.trim().length < 3) {
    const message = encodeURIComponent('Username must be at least 3 characters long.');
    return res.redirect(`/form?error=${message}`);
  }
  next();
};

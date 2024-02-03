
function isAuthenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    res.status(401).send('You need to be logged in to perform this action');
  }
  
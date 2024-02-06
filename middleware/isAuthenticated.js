
// This middleware function checks if the user is logged in by verifying the session.
// If the user is not logged in, it sends a 401 Unauthorized response.
// If the user is logged in, it calls next() to pass control to the next handler.

function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
      // The user is logged in, proceed to the next handler
      next();
  } else {
      // The user is not logged in, send an unauthorized status
      res.status(401).json({ message: "Unauthorized: Please log in." });
  }
}

module.exports = isAuthenticated;
const jwt = require("jsonwebtoken");

const userExtractor = (request, response, next) => {
  if (request.token === undefined) {
    request.user = null;
  } else {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    request.user = decodedToken.id;
  }
  next();
};

module.exports = {
  userExtractor,
};

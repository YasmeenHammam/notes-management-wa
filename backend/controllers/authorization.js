const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const authorize = async (request, response, next) => {
  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: "Token missing" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken.id);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "Token invalid" });
    }
    try {
      const user = await User.findById(decodedToken.id);
      console.log(user);

      if (!user) {
        return response.status(401).json({ error: "User not found" });
      }
      request.user = user;
      next();
    } catch (error) {
      return response.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    return response.status(500).json({ error: "Error verifing the token" });
  }
};

module.exports = authorize;

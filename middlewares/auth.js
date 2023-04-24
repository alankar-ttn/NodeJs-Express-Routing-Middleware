const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config/constant");

const validateRegister = (req, res, next) => {
  const payload = {
    success: false,
    message: "",
  };
  let error = false;
  try {
    const { name, email, password } = req.body;
    if (!(email && password && name)) {
      error = true;
      payload.message = "All fields are required";
    }
  } catch (err) {
    error = true;
    payload.message = err || "Something went wrong!!!";
  } finally {
    if (error) {
      return res.status(400).send(payload);
    }
    next();
  }
};

const validateLogin = (req, res, next) => {
  const payload = {
    success: false,
    message: "",
  };
  let error = false;
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      error = true;
      payload.message = "All fields are required";
    }
  } catch (err) {
    error = true;
    payload.message = err || "Something went wrong!!!";
  } finally {
    if (error) {
      return res.status(400).send(payload);
    }
    next();
  }
};

const validateUser = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("Unauthorized");
    }
    try {
      const decoded = jwt.verify(token, TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateUser,
};

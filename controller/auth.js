const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../config/constant");
const User = require("../model/user");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    const encryptedPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPass,
    });

    res.status(201).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
        expiresIn: "2h",
      });

      user.token = token;

      res.status(200).send(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.user_id);
        if (!user) {
            return res.status(400).send("User does not exist");
        }
        return res.status(200).send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

module.exports = {
  register,
  login,
  getProfile,
};

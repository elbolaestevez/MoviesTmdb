const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const generateToken = (user) => {
  const token = jwt.sign({ sub: user.id }, "milanesa");
  return token;
};

const resolvers = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    me: async (parent, args, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const me = await User.findByPk(user.sub);
      return me;
    },
  },
  Mutation: {
    register: async (parent, { email, password }) => {
      console.log("email", email);
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const user = await User.create({ email, password: hash });

      const token = generateToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }, { res }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("Invalid login");

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error("Invalid login");

      const token = generateToken(user);
      res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

      return { token, user };
    },
    logout: async (parent, args, { res }) => {
      res.clearCookie("token");
      return true;
    },
  },
};

module.exports = resolvers;

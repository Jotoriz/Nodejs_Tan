import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, existUser) => {
    if (existUser)
      return res.status(400).json({
        message: "User already registered",
      });

    const { name, email, password, username, phoneNumber } = req.body;

    const user = new User({
      name,
      email,
      password,
      username,
      phoneNumber,
    });

    user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const { _id, name, email, role } = user;

        return res.status(201).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
          },
        });
      }
    });
  });
};

export const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const { _id, name, email, role, phoneNumber } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
            phoneNumber,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
};
export const signinAdmin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role == "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        const { _id, name, email, role, phoneNumber } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            name,
            email,
            role,
            phoneNumber,
          },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(500).json({ message: "Something went wrong" });
    }
  });
};

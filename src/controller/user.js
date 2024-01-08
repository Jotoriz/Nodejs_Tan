import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-hash_password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
    console.log(err);
  }
};
export const getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { _id, name, email, role, phoneNumber } = user;
    res.status(200).json({ _id, name, email, role, phoneNumber });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };
    const updated = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (updated) {
      return res.status(200).json({
        success: true,
        user: updated,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "missing value",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "server has problem",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const data = {
      oldPassword: req.body.oldPassword,
      newPassWord: req.body.newPassword,
      id: req.params.id,
    };

    const user = await User.findById(data.id);

    const checkPassword = bcrypt.compareSync(
      data.oldPassword,
      user.hash_password
    );

    if (checkPassword) {
      const newHash_password = await bcrypt.hash(data.newPassWord, 10);
      const updated = await User.findByIdAndUpdate(
        data.id,
        {
          hash_password: newHash_password,
        },
        { new: true }
      );
      if (updated) {
        return res.json({
          success: true,
          user: updated,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "something wrong",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "fail password",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "false",
      message: "sever has problem",
    });
  }
};

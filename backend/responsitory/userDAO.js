const bcrypt = require("bcrypt");
const User = require("../models/User.js");

const userDAO = {
  // Lấy danh sách tất cả người dùng
  async getAllUsers() {
    return await User.find();
  },

  // Tạo người dùng mới
  async createUser(userData) {
    return await User.create(userData);
  },

  // Tìm người dùng theo email
  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
};

module.exports = userDAO;

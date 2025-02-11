const bcrypt = require("bcrypt");
const userDAO = require("../responsitory/userDAO.js");
const { createToken } = require("../utiles/tokenCreate");
const { responseReturn } = require("../utiles/response");

const userController = {
  // Đăng ký người dùng mới
  async register(req, res) {
    try {
      const { username, email, password, role, full_name, phone_number, address } = req.body;

      if (!username || !email || !password || !role || !full_name) {
        return responseReturn(res, 400, { message: "Vui lòng nhập đầy đủ thông tin bắt buộc" });
      }

      // Kiểm tra email đã tồn tại chưa
      const existingUser = await userDAO.findUserByEmail(email);
      if (existingUser) {
        return responseReturn(res, 400, { message: "Email đã được sử dụng" });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userDAO.createUser({
        username,
        email,
        password: hashedPassword,
        role,
        full_name,
        phone_number,
        address,
        isActive: true, // Người dùng mới sẽ kích hoạt mặc định
      });

      return responseReturn(res, 201, { message: "Đăng ký thành công", user: newUser });
    } catch (error) {
      return responseReturn(res, 500, { message: "Lỗi khi đăng ký người dùng", error });
    }
  },

  // Đăng nhập người dùng
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return responseReturn(res, 400, { message: "Vui lòng nhập email và mật khẩu" });
      }

      // Tìm người dùng theo email
      const user = await userDAO.findUserByEmail(email);
      if (!user) {
        return responseReturn(res, 404, { message: "Người dùng không tồn tại" });
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return responseReturn(res, 400, { message: "Mật khẩu không chính xác" });
      }

      // Tạo token
      const token = await createToken({ id: user._id, role: user.role });

      return responseReturn(res, 200, {
        message: "Đăng nhập thành công",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          full_name: user.full_name,
          phone_number: user.phone_number,
          address: user.address,
          isActive: user.isActive,
        },
        token,
      });
    } catch (error) {
      return responseReturn(res, 500, { message: "Lỗi khi đăng nhập", error });
    }
  },

  // Đăng xuất người dùng
  async logout(req, res) {
    try {
      return responseReturn(res, 200, { message: "Đăng xuất thành công" });
    } catch (error) {
      return responseReturn(res, 500, { message: "Lỗi khi đăng xuất", error });
    }
  }
};

module.exports = userController;

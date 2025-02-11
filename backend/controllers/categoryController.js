const categoryDAO = require("../responsitory/categoryDAO.js");

const categoryController = {
  // Lấy tất cả thể loại sản phẩm
  async getAllCategorys(req, res) {
    try {
      const categorys = await categoryDAO.getAllCategorys();
      res.status(200).json(categorys);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách người dùng", error });
    }
  },

};

module.exports = categoryController;

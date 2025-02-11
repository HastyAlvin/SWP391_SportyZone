const Category = require("../models/Categories.js");

const categoryDAO = {
  // Lấy danh sách tất cả tên thể loại sản phẩm
  async getAllCategorys() {
    return await Category.find();
  },
};

module.exports = categoryDAO;

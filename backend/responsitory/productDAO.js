const Products = require("../models/Products.js");

const productDAO = {
  // Lấy danh sách tất cả tên sản phẩm
  async getAllproducts() {
    return await Products.find();
  },
};

module.exports = productDAO;


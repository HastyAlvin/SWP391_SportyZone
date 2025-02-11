const Products = require("../models/Products.js");

const productDAO = {
  // Lấy danh sách tất cả sản phẩm
  async getAllProducts() {
    return await Products.find();
  },

  // Lấy danh sách sản phẩm mới nhất
  async getLatestProducts() {
    return await Products.find().limit(9).sort({ updatedAt: -1 });
  },

  // Tạo sản phẩm mới
  async createProduct(productData) {
    const newProduct = new Products(productData);
    return await newProduct.save();
  }
};

module.exports = productDAO;

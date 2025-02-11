const productDAO = require("../responsitory/productDAO.js");

const productController = {
  // Lấy tất cả sản phẩm
  async getAllproducts(req, res) {
    try {
      const products = await productDAO.getAllproducts();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
    }
  },

};

module.exports = productController;

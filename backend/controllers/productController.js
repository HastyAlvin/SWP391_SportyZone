const productDAO = require("../responsitory/productDAO.js");

const productController = {
  // Lấy tất cả sản phẩm và sản phẩm mới nhất
  async getAllProducts(req, res) {
    try {
      const products = await productDAO.getAllProducts();
      const latestProduct = await productDAO.getLatestProducts();

      res.status(200).json({
        products,
        latest_product: [latestProduct]
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách sản phẩm", error });
    }
  },

  // Tạo sản phẩm mới
  async createProduct(req, res) {
    try {
      const { name, description, images, price, quantity, category_id, status } = req.body;

      if (!name || !description || !images || !price || !quantity || !category_id || !status) {
        return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin sản phẩm" });
      }

      const newProduct = await productDAO.createProduct(req.body);
      res.status(201).json({ message: "Sản phẩm được tạo thành công", product: newProduct });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo sản phẩm", error });
    }
  }
};

module.exports = productController;

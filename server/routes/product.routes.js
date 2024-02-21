const ProductController = require("../controllers/product.controller");
const uploadMiddleware=require('../config/image.config');
const upload=require('../config/image.config')

module.exports = (app) => {
    app.post('/api/products',upload.array("files",10), ProductController.createNewProduct)
    // app.post('/api/Product',upload.array("files",10), ProductController.createNewProduct);
    app.get('/api/products',ProductController.findAllProducts)
    app.get('/api/products/count',ProductController.CountAllProducts)
  
    app.get('/api/products/:id',ProductController.findOneProductById)
    app.put('/api/products/:id',ProductController.updateOneProduct)
    app.delete('/api/products/:id',ProductController.deleteOneProduct)
}
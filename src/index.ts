import { InMemoryProductRepository } from './infrastructure/adapters/repositories/InMemoryProductRepository';
import { ProductService } from './application/services/ProductService';
import { ProductController } from './infrastructure/adapters/web/ProductController';
import { ExpressApp } from './infrastructure/config/ExpressApp';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const productRepository = new InMemoryProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
const app = new ExpressApp(productController);

app.listen(PORT);

import express, { Request, Response, NextFunction } from 'express';
import { ProductService } from '../../../application/services/ProductService';
import { CreateProductDTO, UpdateProductDTO } from '../../../domain/entities/Product';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getRouter(): express.Router {
    const router = express.Router();

    router.get('/', this.getAllProducts.bind(this));
    router.get('/:id', this.getProductById.bind(this));
    router.post('/', this.createProduct.bind(this));
    router.put('/:id', this.updateProduct.bind(this));
    router.delete('/:id', this.deleteProduct.bind(this));

    return router;
  }

  private async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  private async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  private async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const productData: CreateProductDTO = req.body;
      const product = await this.productService.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  private async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const productData: UpdateProductDTO = req.body;
      const product = await this.productService.updateProduct(id, productData);
      
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  private async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.productService.deleteProduct(id);
      
      if (!deleted) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

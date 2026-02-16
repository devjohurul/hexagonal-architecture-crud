import { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/ports/ProductRepository';
import { ValidationError } from '../../domain/errors/DomainErrors';

export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: CreateProductDTO): Promise<Product> {
    this.validateProductData(productData);
    return this.productRepository.create(productData);
  }

  async updateProduct(id: string, productData: UpdateProductDTO): Promise<Product | null> {
    if (productData.price !== undefined && productData.price < 0) {
      throw new ValidationError('Price cannot be negative');
    }
    return this.productRepository.update(id, productData);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.productRepository.delete(id);
  }

  private validateProductData(productData: CreateProductDTO): void {
    if (!productData.name || productData.name.trim() === '') {
      throw new ValidationError('Product name is required');
    }
    if (productData.price < 0) {
      throw new ValidationError('Price cannot be negative');
    }
  }
}

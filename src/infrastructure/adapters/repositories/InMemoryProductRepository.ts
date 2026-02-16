import { v4 as uuidv4 } from 'uuid';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../../domain/entities/Product';
import { ProductRepository } from '../../../domain/ports/ProductRepository';

export class InMemoryProductRepository implements ProductRepository {
  private products: Map<string, Product> = new Map();

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.get(id) || null;
  }

  async create(productData: CreateProductDTO): Promise<Product> {
    const product: Product = {
      id: uuidv4(),
      name: productData.name,
      description: productData.description,
      price: productData.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(product.id, product);
    return product;
  }

  async update(id: string, productData: UpdateProductDTO): Promise<Product | null> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) {
      return null;
    }

    const updatedProduct: Product = {
      ...existingProduct,
      name: productData.name ?? existingProduct.name,
      description: productData.description ?? existingProduct.description,
      price: productData.price ?? existingProduct.price,
      updatedAt: new Date(),
    };

    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

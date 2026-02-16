import { Product, CreateProductDTO, UpdateProductDTO } from '../entities/Product';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  create(product: CreateProductDTO): Promise<Product>;
  update(id: string, product: UpdateProductDTO): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
}

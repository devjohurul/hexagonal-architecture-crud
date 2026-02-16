import { InMemoryProductRepository } from '../../../infrastructure/adapters/repositories/InMemoryProductRepository';
import { CreateProductDTO, UpdateProductDTO } from '../../../domain/entities/Product';

describe('InMemoryProductRepository', () => {
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
  });

  describe('create', () => {
    it('should create a product with generated id', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const product = await repository.create(productData);

      expect(product.id).toBeDefined();
      expect(product.name).toBe(productData.name);
      expect(product.description).toBe(productData.description);
      expect(product.price).toBe(productData.price);
    });
  });

  describe('findAll', () => {
    it('should return empty array initially', async () => {
      const products = await repository.findAll();
      expect(products).toEqual([]);
    });

    it('should return all created products', async () => {
      await repository.create({ name: 'Product 1', description: 'Desc 1', price: 10 });
      await repository.create({ name: 'Product 2', description: 'Desc 2', price: 20 });

      const products = await repository.findAll();
      expect(products).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('should return product when found', async () => {
      const created = await repository.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      });

      const found = await repository.findById(created.id);
      expect(found).toEqual(created);
    });

    it('should return null when product not found', async () => {
      const found = await repository.findById('non-existent-id');
      expect(found).toBeNull();
    });
  });

  describe('update', () => {
    it('should update existing product', async () => {
      const created = await repository.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      });

      const updateData: UpdateProductDTO = {
        name: 'Updated Product',
        price: 149.99,
      };

      const updated = await repository.update(created.id, updateData);

      expect(updated).toBeDefined();
      expect(updated?.name).toBe(updateData.name);
      expect(updated?.price).toBe(updateData.price);
      expect(updated?.description).toBe(created.description);
    });

    it('should return null when updating non-existent product', async () => {
      const updated = await repository.update('non-existent-id', { name: 'Updated' });
      expect(updated).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete existing product', async () => {
      const created = await repository.create({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      });

      const deleted = await repository.delete(created.id);
      expect(deleted).toBe(true);

      const found = await repository.findById(created.id);
      expect(found).toBeNull();
    });

    it('should return false when deleting non-existent product', async () => {
      const deleted = await repository.delete('non-existent-id');
      expect(deleted).toBe(false);
    });
  });
});

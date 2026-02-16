import { ProductService } from '../../application/services/ProductService';
import { InMemoryProductRepository } from '../../infrastructure/adapters/repositories/InMemoryProductRepository';
import { CreateProductDTO, UpdateProductDTO } from '../../domain/entities/Product';

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: InMemoryProductRepository;

  beforeEach(() => {
    productRepository = new InMemoryProductRepository();
    productService = new ProductService(productRepository);
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const product = await productService.createProduct(productData);

      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBe(productData.name);
      expect(product.description).toBe(productData.description);
      expect(product.price).toBe(productData.price);
      expect(product.createdAt).toBeInstanceOf(Date);
      expect(product.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw error when name is empty', async () => {
      const productData: CreateProductDTO = {
        name: '',
        description: 'Test Description',
        price: 99.99,
      };

      await expect(productService.createProduct(productData)).rejects.toThrow('Product name is required');
    });

    it('should throw error when price is negative', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: -10,
      };

      await expect(productService.createProduct(productData)).rejects.toThrow('Price must be a positive number');
    });
  });

  describe('getAllProducts', () => {
    it('should return empty array when no products exist', async () => {
      const products = await productService.getAllProducts();
      expect(products).toEqual([]);
    });

    it('should return all products', async () => {
      const productData1: CreateProductDTO = {
        name: 'Product 1',
        description: 'Description 1',
        price: 10,
      };
      const productData2: CreateProductDTO = {
        name: 'Product 2',
        description: 'Description 2',
        price: 20,
      };

      await productService.createProduct(productData1);
      await productService.createProduct(productData2);

      const products = await productService.getAllProducts();
      expect(products).toHaveLength(2);
    });
  });

  describe('getProductById', () => {
    it('should return product when it exists', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const createdProduct = await productService.createProduct(productData);
      const product = await productService.getProductById(createdProduct.id);

      expect(product).toBeDefined();
      expect(product?.id).toBe(createdProduct.id);
      expect(product?.name).toBe(productData.name);
    });

    it('should return null when product does not exist', async () => {
      const product = await productService.getProductById('non-existent-id');
      expect(product).toBeNull();
    });
  });

  describe('updateProduct', () => {
    it('should update product successfully', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const createdProduct = await productService.createProduct(productData);

      const updateData: UpdateProductDTO = {
        name: 'Updated Product',
        price: 149.99,
      };

      const updatedProduct = await productService.updateProduct(createdProduct.id, updateData);

      expect(updatedProduct).toBeDefined();
      expect(updatedProduct?.name).toBe(updateData.name);
      expect(updatedProduct?.price).toBe(updateData.price);
      expect(updatedProduct?.description).toBe(productData.description);
    });

    it('should return null when updating non-existent product', async () => {
      const updateData: UpdateProductDTO = {
        name: 'Updated Product',
      };

      const result = await productService.updateProduct('non-existent-id', updateData);
      expect(result).toBeNull();
    });

    it('should throw error when updating with negative price', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const createdProduct = await productService.createProduct(productData);

      const updateData: UpdateProductDTO = {
        price: -10,
      };

      await expect(productService.updateProduct(createdProduct.id, updateData)).rejects.toThrow('Price must be a positive number');
    });
  });

  describe('deleteProduct', () => {
    it('should delete product successfully', async () => {
      const productData: CreateProductDTO = {
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
      };

      const createdProduct = await productService.createProduct(productData);
      const deleted = await productService.deleteProduct(createdProduct.id);

      expect(deleted).toBe(true);

      const product = await productService.getProductById(createdProduct.id);
      expect(product).toBeNull();
    });

    it('should return false when deleting non-existent product', async () => {
      const deleted = await productService.deleteProduct('non-existent-id');
      expect(deleted).toBe(false);
    });
  });
});

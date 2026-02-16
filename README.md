# Hexagonal Architecture CRUD

A CRUD (Create, Read, Update, Delete) application demonstrating the Hexagonal Architecture pattern (also known as Ports and Adapters pattern) using TypeScript and Node.js.

## Architecture Overview

This project follows the Hexagonal Architecture pattern with clear separation of concerns:

```
src/
├── domain/              # Core business logic (innermost layer)
│   ├── entities/        # Business entities and DTOs
│   └── ports/           # Interfaces defining contracts
├── application/         # Application services and use cases
│   └── services/        # Business logic orchestration
└── infrastructure/      # External adapters (outermost layer)
    ├── adapters/
    │   ├── repositories/  # Data persistence implementations
    │   └── web/          # HTTP/REST API controllers
    └── config/          # Application configuration
```

### Layers

1. **Domain Layer**: Contains pure business logic, entities, and port interfaces. Has no dependencies on other layers.
2. **Application Layer**: Orchestrates business logic using domain entities and ports.
3. **Infrastructure Layer**: Implements ports and handles external interactions (HTTP, database, etc.).

## Features

- RESTful API for Product CRUD operations
- In-memory data storage (easily replaceable with any database)
- TypeScript for type safety
- Comprehensive test suite with Jest
- Clean separation of concerns following hexagonal architecture
- Easy to extend with new adapters (different databases, messaging systems, etc.)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

```bash
npm install
```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- **GET** `/health` - Check if the server is running

### Products
- **GET** `/api/products` - Get all products
- **GET** `/api/products/:id` - Get a product by ID
- **POST** `/api/products` - Create a new product
- **PUT** `/api/products/:id` - Update a product
- **DELETE** `/api/products/:id` - Delete a product

### Example Requests

#### Create Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99
  }'
```

#### Get All Products
```bash
curl http://localhost:3000/api/products
```

#### Get Product by ID
```bash
curl http://localhost:3000/api/products/{product-id}
```

#### Update Product
```bash
curl -X PUT http://localhost:3000/api/products/{product-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Laptop",
    "price": 899.99
  }'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/{product-id}
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Linting

```bash
npm run lint
```

## Project Structure Details

### Domain Layer (`src/domain/`)
- **entities/Product.ts**: Defines the Product entity and DTOs
- **ports/ProductRepository.ts**: Interface for product repository (port)

### Application Layer (`src/application/`)
- **services/ProductService.ts**: Business logic for product operations

### Infrastructure Layer (`src/infrastructure/`)
- **adapters/repositories/InMemoryProductRepository.ts**: In-memory implementation of ProductRepository
- **adapters/web/ProductController.ts**: Express.js REST controller
- **config/ExpressApp.ts**: Express application configuration

## Benefits of Hexagonal Architecture

1. **Testability**: Business logic can be tested independently of external systems
2. **Flexibility**: Easy to swap implementations (e.g., change from in-memory to PostgreSQL)
3. **Maintainability**: Clear separation of concerns makes code easier to understand and modify
4. **Technology Independence**: Core business logic is independent of frameworks and libraries

## Extending the Application

### Adding a New Repository Implementation

To add a database implementation (e.g., PostgreSQL):

1. Create a new file in `src/infrastructure/adapters/repositories/`
2. Implement the `ProductRepository` interface
3. Update the dependency injection in `src/index.ts`

Example:
```typescript
export class PostgresProductRepository implements ProductRepository {
  // Implement all methods from ProductRepository interface
}
```

### Adding a New Entity

1. Create entity definition in `src/domain/entities/`
2. Create repository port in `src/domain/ports/`
3. Create service in `src/application/services/`
4. Create repository implementation in `src/infrastructure/adapters/repositories/`
5. Create controller in `src/infrastructure/adapters/web/`
6. Wire dependencies in `src/index.ts`

## License

MIT
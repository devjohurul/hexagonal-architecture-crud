import express, { Express, Request, Response, NextFunction } from 'express';
import { ProductController } from '../adapters/web/ProductController';

export class ExpressApp {
  private app: Express;

  constructor(private readonly productController: ProductController) {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandler();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupRoutes(): void {
    this.app.get('/health', (req: Request, res: Response) => {
      res.json({ status: 'ok' });
    });

    this.app.use('/api/products', this.productController.getRouter());
  }

  private setupErrorHandler(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error('Error:', err.message);
      res.status(400).json({ error: err.message });
    });
  }

  public getApp(): Express {
    return this.app;
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

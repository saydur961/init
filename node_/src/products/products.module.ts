import { Router } from 'express';
import { redisRepo } from "../redis/redis.module";
import { ProductController } from "./products.controller";
import { ProductRepository } from "./products.repository";
import { ProductService } from "./products.service";
import { ProductSchema } from "./schema/products.schema";

const router = Router();


const repository = new ProductRepository(ProductSchema, redisRepo);
const productService = new ProductService(repository);
const controller = new ProductController(router, productService);

export const foodModule = {
  repo: repository,
  controller: controller
}

export const productRouter = router;
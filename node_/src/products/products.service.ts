import { ProductRepository } from "./products.repository";
import { ty_getAll_param } from "./types/param.type";
// import { ty_service_res } from "../types/general.type";

export class ProductService {
  
  constructor(
    public productRepo: ProductRepository
  ){}

  async getAll(param: ty_getAll_param) {
    return this.productRepo.getProducts();
  }

  async getOne(food_id: string) {
    
    const foodRes = await this.productRepo.getOneProduct(food_id);

    if(!foodRes) {
      return {
        err: 'Food item not found'
      }
    }

    return {
      data: foodRes
    }

  }

}
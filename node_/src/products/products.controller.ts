import { Request, Response, Router } from "express";
import { is_integer } from "../utils/is_integer";
import { isValidObjectId } from "../utils/is_valid_objectId";
import { ProductService } from "./products.service";
import { ty_getAll_param, ty_getAll_sortType } from "./types/param.type";

const SORT_LIST: ty_getAll_sortType[] = ['default', 'price_asc', 'price_desc'];

interface T_getOneFood_param {
  id: string;
}

export class ProductController{

  public productService: ProductService;

  constructor(
    router: Router,
    productService: ProductService
  ){

    this.productService = productService;

    // hanlde router
    router.get('/test', this.test.bind(this));

    router.get('/getAll', this.getFoods.bind(this));

  }

  // async getStaticFood(args: ty_getFoods_param) {
  //   const burgerList = await this.foodService.getStaticFoods(args.page);
  //   return burgerList;
  // }

  async test(req: Request, res: Response) {

    console.log(this);

    res.status(200).json({ status: 'test result' })
  }

  async getFoods(req: Request, res: Response) {

    try {

      console.log(this.productService);

      const query = req.query;

      // // check reqbody
      // if(!query) {
      //   throw new Error('invalid data');
      // }
      // // check page
      // if(
      //   !query.page || !is_integer(query.page) || Number(query.page) < 1 || 
      //   Number(query.page) > 10
      // ) {
      //   throw new Error('invalid page number');
      // }

      const burgerList = await this.productService.getAll(query);

      console.log(burgerList);

      res.status(200).json(burgerList);

    }
    catch(err) {
      console.log(err);
      res.status(500).json({ status: 'error' });
    }
  }

  // =============================== get one food ===============================
  async getOneFood(args: T_getOneFood_param) {

    if(!args || !args.id || !isValidObjectId(args.id)) {
      throw new Error('invalid food id')
    }

    const serviceRes = await this.productService.getOne(args.id);

    if(serviceRes.err || !serviceRes.data) {
      throw new Error(serviceRes.err || '')
    }

    return serviceRes.data

  }


}
import { RedisRepository } from "../redis/redis.repository";
import { ProductSchema } from "./schema/products.schema";
import { ty_getAll_res, ty_getOne_res } from "./types/res.type";

const LIMIT_DOC = 5;

export class ProductRepository {

  constructor(
    public productSchema: typeof ProductSchema,
    public redis: RedisRepository
  ) { }

  // ======================== get all products ========================
  async getProducts() {

    // get burger list
    const productList = await this.productSchema.find(
      {},
      {
        _id: 1,
        name: 1,
        image: 1
      }
    )
    .limit(LIMIT_DOC)
    .lean();

    return productList as ty_getAll_res[];
  }

  // ======================== get one product details ========================
  async getOneProduct(id: string): Promise<ty_getOne_res | null> {

    let docData = await this.productSchema.findOne(
      { _id: id },
      {
        _id: 1, name: 1, price: 1, image: 1
      }
    ).lean() as ty_getOne_res | null;

    if (!docData) return null;

    docData = {
      ...docData,
      _id: docData._id.toString()
    }

    return docData;

  }


}
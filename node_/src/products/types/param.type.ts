export type ty_getAll_sortType = 'default'| 'price_asc'| 'price_desc';


export interface ty_getAll_param {
  page?: number;
  sort?: ty_getAll_param;
}
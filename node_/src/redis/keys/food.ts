interface getFoods_param {
  page: number;
  category: string;
  item_type: string;
  sort_option: string;
}

export const redis_getFoods = (param: getFoods_param) => `food_get#${param.category}#${param.item_type}#${param.sort_option}#${param.page}`;
export const redis_getOneFood_short = (id: string) => `food_get_one_short#${id}`;
export const redis_getOneFood_detail = (id: string) => `food_get_one_detail#${id}`;
export const redis_category_food_summary = () => `food_get_category_summary`;
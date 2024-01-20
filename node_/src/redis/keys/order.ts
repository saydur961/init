type T_getOrderUser = {
  page: number;
  user_id: string;
}

export const redis_getOneOrder = (id: string) => `order_get_one#${id}`;
export const redis_getAllOrderUser = ({ page, user_id }: T_getOrderUser) => 
`order_get_all_users#${user_id}#${page}`;

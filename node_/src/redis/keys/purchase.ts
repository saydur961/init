interface T_redis_get_one_purchase_of_user {
  burger_id: string;
  user_id: string;
}

export const redis_get_one_purchase_of_user = (
  { burger_id, user_id }: T_redis_get_one_purchase_of_user
) => `purchase_get_one_of_user#${user_id}#${burger_id}`;

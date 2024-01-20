import { client as _client } from './redis.module';
import { REDIS_NOT_EXIST } from './redis.utils';

type TResStatus = 'exist'| 'not_exist'| 'null';

type TObj = {[x: string]: string|number }

// type Ipipeline = () => void
type Ipipeline = Promise<{[x: string]: string;}>[];

interface Tset {
  key: string;
  value: TObj;
  expire?: number;
}


export class RedisRepository {

  constructor(
    public client: typeof _client
  ){}

  // async hGetAll<T>(key: string) {

  //   const result = await this.client.hGetAll(key);
  //   if(Object.keys(result).length === 0) return null;
  //   // @ts-ignore
  //   return result as T;
  // }

  // ========================== create hash table ============================
  async hSet(key: string, value: TObj) {

    await this.client.hSet(key, value)

  }

  // async pipeline(queries: Ipipeline) {

  //   return await Promise.all(queries);

  // }

  // ========================== create string object ============================
  async setObj(key: string, value: any|null, expire?: number) {

    let val: string;
    if(value === null) {
      val = REDIS_NOT_EXIST;
    }
    else {
      val =  JSON.stringify(value);
    }

    await this.client.set(key, val, {
     ...(expire && { EX: expire})
    })

  }

  // ========================== get string object ============================
  async getObj<T>(key: string): Promise<{
    exist: boolean; status: TResStatus, data: T
  }> {

    const strValue = await this.client.get(key);

    const nullVal = null as T;

    if(!strValue) {
      return {
        exist: false,
        status: 'not_exist',
        data: nullVal
      }
    }

    if(strValue === REDIS_NOT_EXIST) {
      return {
        exist: false,
        status: 'null',
        data: nullVal
      }
    }

    const objVal = JSON.parse(strValue) as T;

    return {
      exist: true,
      status: 'exist',
      data: objVal
    }

  }

  // ========================== delete a key ============================
  async delete(key: string) {
    await this.client.del(key);
  }

}
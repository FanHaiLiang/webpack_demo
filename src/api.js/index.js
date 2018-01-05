import { get,post } from './apiFactory';

/**
 * 例子
 */

export function test (teacherId){
  return post('/taughtLog',{teacherId})
}

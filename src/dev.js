/** 
 * 该类用于开发调试, 打包时会忽略此文件.
 */
import { module1, module2 } from './index';
var person = module1();
var age = module2.print(34);
document.querySelector('#app').innerHTML = '<h1>hello '.concat(person.name, ', ').concat(age, '!</h1><h2>DEV: ').concat(__DEV__, '</h2>');
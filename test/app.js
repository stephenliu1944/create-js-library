/** 
 * 该类用于开发调试, 打包时会忽略此文件.
 */
import { module1, Module2 } from '../src/index';

let m1 = module1.say('Hello');
let m2 = new Module2('World!');
document.querySelector('#app').innerHTML = `<h1>${m1 + m2.getMessage()}</h1><h2>DEV: ${__DEV__}</h2>`;
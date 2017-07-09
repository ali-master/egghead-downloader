import "babel-polyfill";

import CheckURL from './utils/CheckURL';

const checking = new CheckURL('https://egghead.com');

console.log('url', checking.URL, "version", VERSION);

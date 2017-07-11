import "babel-polyfill";

import path from "path";
import program from "commander";

program
    .version(VERSION)
    .option('-u, --url <value>', 'An egghead url')
    .parse(process.argv);

console.log('p', program.url);

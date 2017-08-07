import "babel-polyfill";

import $ from "cheerio";
import path from "path";
import chalk from "chalk";
import program from "commander";
import request from "superagent";

let urlValue;
program
	.version(VERSION)
	.arguments('<url>')
	.option('-u, --url', 'Add the URL of the video from egghead.io')
	.action(url => {
		urlValue = url
	});
program.parse(process.argv)

console.log("length", process.argv.slice(2).length);
console.log(program.url)

if (process.argv.slice(2).length < 2) {
	program.outputHelp()
	process.exit()
}

request.get(urlValue).end((err, res) => {
    console.log("res", $(res.text).find(".items-baseline h1").text())
 });

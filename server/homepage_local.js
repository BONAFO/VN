const { writeFile, readFile } = require("fs");
const path = require("path");
const utils = require('util');
let writeFile_pro = utils.promisify(writeFile);
let readFile_pro = utils.promisify(readFile);





(async () => {
   const url = path.join(__dirname , "../vn/");
   const package = JSON.parse((await readFile_pro(url + 'package.json')).toString());
   console.log(package["homepage"]);
   package["homepage"] = '.'
   await writeFile_pro(url + 'package.json', JSON.stringify(package));
})()
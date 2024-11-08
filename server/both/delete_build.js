const { rm } = require("fs");
const utils = require('util');
const path = require("path");
let rm_pro = utils.promisify(rm);


(async ()=>{

    const pat = path.join(__dirname , "../../vn/build/");
    await rm_pro(pat, {recursive: true})
})()

var MEAP = require("meap");
var fs = require('fs');
var path = require('path');

function run(Param, Robot, Request, Response, IF)
{
	var dir = path.join(__dirname,"../admin/attachments/", Param.params.path);
	fs.exists(dir,function(isdir){
		if(isdir){
			var option = {
                        Request : Request,
                        Response : Response,
                        pathname : dir
            }
            MEAP.SFS.Runner(option,null,Robot);
		}else{
			Response.end(JSON.stringify({status: 0,message: '文件不存在'}));
		}
	});
	
}
exports.Runner=run;
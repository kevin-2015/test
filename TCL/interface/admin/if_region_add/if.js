var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var pid = Param.fields.pid;
	var name = Param.fields.name;
	var level = Param.fields.level;
	var usetype = Param.fields.usetype;
	var displayorder = Param.fields.displayorder;
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"INSERT INTO `Region` (`pid`,`name`,`level`,`usetype`,`displayorder`) VALUES ("+pid+", '"+name+"', "+level+", "+usetype+", "+displayorder+")"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:'addSuccess'}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'addFail'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
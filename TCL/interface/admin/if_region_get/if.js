var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var pid = Param.fields.pid;
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT `id`,`name` FROM `Region` WHERE `pid`='"+pid+"' order by `displayorder` desc"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:rows}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'Error'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
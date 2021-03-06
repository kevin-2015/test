var MEAP=require("meap");
var fs = require("fs");

function run(Param,Robot,Request,Response,IF)
{
	try
	{
		var id = Param.params.id;
		var option1={
			CN:TCL_SERVER_CN,
			sql:"select * from MenuInfo where id='"+id+"'"
		};
		
	  	var option={
			CN:TCL_SERVER_CN,
			sql:"delete from MenuInfo where id='"+id+"'"
		};
		MEAP.ODBC.Runner(option1,function(err,rows,cols)
		{
			if(!err&rows.length>0)
			{
				var iconUrl = rows[0].iconUrl;
				fs.exists(iconUrl,function(res){
					if(res){
						fs.unlink(iconUrl);
					}
				});
				MEAP.ODBC.Runner(option,function(err,rows,cols)
				{
					if(!err){
						
						Response.end(JSON.stringify({status:'0',message:'Success'}));
					}else{
						Response.end(JSON.stringify({status:'-1',message:'Error'}));
					}
				},Robot);
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;


var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.id;
	var pid = Param.fields.pid;
	var name = Param.fields.name;
	var level = Param.fields.level;
	var usetype = Param.fields.usetype;
	var displayorder = Param.fields.displayorder;
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"UPDATE `Region` SET pid = "+pid+", name = '"+name+"', level = "+level+", usetype = "+usetype+", displayorder = "+displayorder+" WHERE id = "+id
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:'updateSuccess'}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'updateFail'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
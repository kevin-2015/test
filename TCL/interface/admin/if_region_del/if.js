var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.id;
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"DELETE FROM `Region` WHERE id = "+id
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:'delSuccess'}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'delFail'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
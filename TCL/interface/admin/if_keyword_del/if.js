var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var ids = Param.params.id;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"UPDATE `ProductKeyword` SET `status` = '2'  WHERE `id` ='"+ids+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'1',data:rows}));
			}else{
				Response.end(JSON.stringify({status:'0',message:'Error'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'0',message:'Error'}));
	}
}

exports.Runner=run;


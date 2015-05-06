var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.params.id;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM ProductParameter WHERE id='"+id+"'"
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


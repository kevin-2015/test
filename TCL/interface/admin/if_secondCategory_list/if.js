var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"select id,name from ProductParameter where flag='category' and level=3"
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


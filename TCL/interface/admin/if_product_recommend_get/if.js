var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var id = Param.params.id;
        var option={
			CN:TCL_SERVER_CN,
			sql:"select * from Meta where meta_id='"+id+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err&rows.length>0){
				var meta_value = JSON.parse(rows[0]['meta_value']);
				
				Response.end(JSON.stringify({status:'0',data:meta_value}));
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


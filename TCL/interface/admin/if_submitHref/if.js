var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var id = Param.params.id;
		var sHref = Param.params.sHref;
		
        var option={
			CN:TCL_SERVER_CN,
			sql:"update MenuInfo set targetUrl='"+sHref+"' where id='"+id+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'0',message:'Success'}));
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


var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var id = Param.params.id;
		var sHref = Param.params.sHref;
		var column = Param.params.column;
		
		var sql = "";
		if(column=="href"){
			sql = "update SystemActivity set href='"+sHref+"' where id='"+id+"'";
		}else if(column =="article"){
			sql = "update SystemActivity set article='"+sHref+"' where id='"+id+"'";
		}else if(column=="title"){
			sql = "update SystemActivity set title='"+sHref+"' where id='"+id+"'";
		}else if(column=="picture"){
			sql = "update SystemActivity set picture='"+sHref+"' where id='"+id+"'";
		}
        var option={
			CN:TCL_SERVER_CN,
			sql:sql
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


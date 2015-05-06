var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var parId = Param.params.id;
	var flag = Param.params.flag;
	var level = Param.params.level;
	try{
		var conditions = ' status= 1';
		if(parId){
			conditions += " AND pid='"+parId+"'"
		}
		if(flag){
			conditions += " AND flag='"+flag+"'"
		}
		if(level){
			conditions += " AND level='"+level+"'"
		}
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM ProductParameter WHERE "+conditions
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			LOG5('----rows-----',rows);
			if(!err){
				Response.setHeader("Content-type","application/text;charset=utf8")
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


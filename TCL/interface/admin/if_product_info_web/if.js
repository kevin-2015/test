var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.params.id;
	var twoId = Param.params.twoId;
	var conditions = '';
	if(twoId && twoId !=''){
		conditions = id+','+twoId;
	}else{
		conditions = id;
	}
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM ProductInfo WHERE id IN("+conditions+")"
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


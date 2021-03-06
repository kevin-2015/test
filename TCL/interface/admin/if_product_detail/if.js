var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.params.id;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT p.*,group_concat(a.name) as paranames FROM `ProductInfo` p LEFT JOIN ProductSpecInfo s ON p.id=s.productId LEFT JOIN ProductParameter a ON s.specValue=a.id WHERE p.id='"+id+"' GROUP BY p.id"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			LOG5('---rows---',rows);
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


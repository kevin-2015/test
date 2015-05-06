var MEAP=require("meap");
//Robot.verifySession(Request);
function run(Param,Robot,Request,Response,IF)
{
	var status = Param.params.status;
	var name = Param.params.name;
	var type = Param.params.type;

	var countryCode = Robot.Get("countryCode");
	var conditions = ' 1=1';
	if(type && type !=0){
		conditions += " AND type='"+type+"'";
	}
	if(status && status !=0){
		conditions += " AND p.status='"+status+"'";
	}
	if(name){
		conditions += " AND p.name LIKE '%"+name+"%'";
	}
	if(countryCode){
		conditions += " AND p.countryCode='"+countryCode+"'";
	}
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT p.*,group_concat(a.name) as paranames FROM ProductInfo p LEFT JOIN ProductSpecInfo s ON p.id=s.productId LEFT JOIN ProductParameter a ON s.parameterId=a.id  WHERE "+conditions+" GROUP BY p.id ORDER BY p.id DESC LIMIT 0,20"
		};
		
		MEAP.ODBC.Runner(option,function(err,rows,cols){		
			if(!err){
				/*for(var i=0;i<rows.length;i++){
				}*/
				Response.end(JSON.stringify({status:'1',data:rows}));
			}else{
				Response.end(JSON.stringify({status:'0',message:'Success'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'0',message:'Error'}));
	}
}

exports.Runner=run;
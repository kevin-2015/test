var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var type = Param.params.type;
		var pageTag = Param.params.pageTag;
		var countryCode = Robot.Get("countryCode");
        var option={
			CN:TCL_SERVER_CN,
			sql:"select * from MenuInfo where type='"+type+"' and pageTag='"+pageTag+"' and countryCode='"+countryCode+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err&rows.length>0){
				
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


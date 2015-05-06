var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.id;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"UPDATE `ShopInfo` SET `lable` = 1  WHERE `id` ="+id
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'1',data:rows}));
				postdata(Robot,Request,Response);
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
function postdata(Robot,Request,Response){
	 var countryUrl = Robot.Get("countryUrl");
	 var option={
			method : "POST",
			url : countryUrl+"web_manager/storeAddress_update",
			Body:{"oper":"del","pid":id}
		};
		
		MEAP.AJAX.Runner(option,function(err,res,data){
		    if(!err)
		    {
				Response.end(JSON.stringify({
		                    status: '1',
							newid:id
		                }));
		    }
		    else
		    {
				Response.end(JSON.stringify({
	                    status: '0'
	                }));
		    }
		},Robot);
	
}

exports.Runner=run;

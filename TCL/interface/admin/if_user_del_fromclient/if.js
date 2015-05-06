var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var userId = Param.params.userId;
//console.log("ajax===>",userId);
	var option={
		method : "GET",
		url : "127.0.0.1:8080/admin/public/web/user_del?userId="+userId,
		Cookie : "true"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
		data = JSON.parse(data);
	    if(err!="-1"&data.status=="0")
	    {
			
			Response.end(JSON.stringify({status:'0',message:'Success' }));	
	    }
	    else
	    {
			Response.end(JSON.stringify({status:'-1',message:'Error'}));
	    }
	},Robot);
}

exports.Runner = run;


                                

	


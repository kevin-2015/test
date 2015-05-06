var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var id = Param.params.id;
	var option={
		method : "GET",
		url : "127.0.0.1:8080/admin/public/web/message_update?id="+id,
		Cookie : "true"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
	    if(!err)
	    {
			Response.end(data);
	    }
	    else
	    {
			Response.end(data);
	    }
	},Robot);
}

exports.Runner = run;


                                

	


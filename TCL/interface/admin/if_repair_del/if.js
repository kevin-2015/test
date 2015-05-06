var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var id = Param.params.id;
	var option={
		method : "GET",
		url : "http://127.0.0.1:8080/tclServer/web/web/repair_del?id="+id,
		Cookie : "true"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
	    if(!err)
	    {
			//Add your normal handling code
			Response.end(data);
	    }
	    else
	    {
			//Add your exception handling code 
			Response.end(data);
	    }
	},Robot);
}

exports.Runner = run;


                                

	


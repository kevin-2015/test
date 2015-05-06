var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var countryUrl = Robot.Get("countryUrl");
	var transpStatus = Param.params.transpStatus;
	var option={
		method : "GET",
		url : countryUrl+"web_manager/repair_list?transpStatus="+transpStatus,
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
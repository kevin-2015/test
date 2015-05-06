var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var countryUrl = Robot.Get("countryUrl");
	var replyStatus = Param.params.replyStatus;
	var pageVal = Param.params.page ;
	var countVal = Param.params.count;
	var option={
		method : "GET",
		url : countryUrl+"web_manager/message_list?replyStatus="+replyStatus+"&pageVal="+pageVal+"&countVal="+countVal,
		Cookie : "true"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
	    if(!err)
	    {
			Response.end(data);
	    }
	    else
	    {
			LOG5('---1err----',err);
			LOG5('---1data----',data);
			Response.end(data);
	    }
	},Robot);
}

exports.Runner = run;
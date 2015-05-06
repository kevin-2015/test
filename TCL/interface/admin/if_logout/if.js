var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	Robot.destroySession(Request,Response);
	Response.end(JSON.stringify({status:'0',message:'logoutSuccess'}));
}

exports.Runner = run;
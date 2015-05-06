var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var code = Param.fields.code;

	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM `Country` WHERE `countryCode`= '"+code+"' LIMIT 1"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Robot.Set("countryCode",rows[0]['countryCode']);
				Robot.Set("countryUrl",rows[0]['url']);
				Response.end(JSON.stringify({status:'0',code:Robot.Get("countryCode"),url:Robot.Get("countryUrl")}));
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

exports.Runner = run;
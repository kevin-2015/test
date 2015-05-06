var MEAP=require("meap");
var crypto=require("crypto");
require("../Initialize.js");

function run(Param,Robot,Request,Response,IF)
{
    var username = Param.fields.username;
    var password = Param.fields.password;
	var redir = Param.params.url;
    
	
	if(!username || !password){
		Response.end(JSON.stringify({status:'-1',message:"usePassNotEmpty"}));
		return;
	}
	
	var sid = Robot.createSession(Response, true, 600);
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM AdmUserInfo WHERE name = '"+username+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(err != -1 && rows[0]){
				password = crypto.createHash('md5').update(password+'TCL').digest('hex');
				if(rows[0]['password'] == password){
					Robot.activeSession(86400);
					
					Robot.Set("username",rows[0]['name']);
					Robot.Set("isFounder",rows[0]['isFounder']);
					
					var cookies = Response.getHeader("Set-Cookie") || [];
					cookies.push("x-mas-app-info=" + Param.appid + "/" + sid + "; path=/");
					Response.setHeader("Set-Cookie", cookies);
					
					Response.end(JSON.stringify({status:'0',data:{username:rows[0]['username'],nick:rows[0]['nick']}}));
				}
			}
			Response.end(JSON.stringify({status:'-1',message:'loginFail'}));
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:e.message}));
	}
}

exports.Runner=run;

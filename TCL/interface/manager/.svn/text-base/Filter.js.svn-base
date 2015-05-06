function run(Param, Robot, Request, Response, IF, cb){
	var state = false;
	try {
		state = Robot.verifySession(Request);
	}
	catch(e){}
			switch(Param.cmd)
			{
				case "manager/login.html":
					if (state) {
						Response.statusCode = 302;
						Response.setHeader("Location", "index.html");
						Response.end();
						cb(-1);
						return;
					}
					else
						cb(0);
				break;
				default:
					if (!state && Request.url.indexOf(".html") >=0) {
						Response.statusCode = 302;
						Response.setHeader("Location", "login.html");
						Response.end();
						cb(-1);
						return;
					}
					else
						cb(0);
				break;
			}
}

exports.Runner = run;

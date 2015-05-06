function run(Param, Robot, Request, Response, IF, cb){
	var state = false;
	try {
		state = Robot.verifySession(Request);
	}
	catch(e){}
    switch ((IF.type + "/" + IF.path)) {
        case "admin/login":
			cb(0)
			break;
        default:
            {
                if (!state) {
                    Response.end(JSON.stringify({
                        status: -1,
                        message: "You Not Login"
                    }));
                    cb(-1);
                }
                else 
                    cb(0);
            }
    }
}

exports.Runner = run;

var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var flag = Param.params.flag;
	var option={
		method : "GET",
		url : "127.0.0.1:8080/admin/public/web/user_review_list?flag="+flag,
		Cookie : "true"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
		data = JSON.parse(data);
	    if(err!="-1"&data.status=="0")
	    {
			
			Response.end(JSON.stringify({status:'0',rows:data.rows}));
	    }
	    else
	    {
			Response.end(JSON.stringify({status:'-1',message:'Error'}));
	    }
	},Robot);
}

exports.Runner = run;


                                

	


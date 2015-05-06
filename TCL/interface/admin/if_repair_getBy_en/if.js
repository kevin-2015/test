var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	var caseno = Param.fields.caseno;
	var option={
		method : "POST",
		url : "http://210.75.9.14/crm_test/interface/getstatus.php",
		Body:{"caseno":caseno},
		Enctype:"application/x-www-form-urlencoded"
	};
	
	MEAP.AJAX.Runner(option,function(err,res,data){
	    if(!err)
	    {
			MEAP.PARSER.Runner("XML",data,function(err,da){
				var msg = {"status":1,"details":da.case.status};
				Response.end(JSON.stringify(msg));
			});
	    }
	    else
	    {
			//Add your exception handling code 
			Response.end("{'status':0}");
	    }
	},Robot);
}

exports.Runner = run;


                                

	


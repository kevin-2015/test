var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var sTitle = Param.params.sTitle;
		var sArticle =Param.params.sArticle ;
		var sPicture =Param.params.sPicture ;
		var sHref = Param.params.sHref;
		var countryCode = Robot.Get("countryCode");
        var option={
			CN:TCL_SERVER_CN,
			sql:"insert into SystemActivity(title,article,picture,href,countryCode) values('"+sTitle+"','"+sArticle+"','"+sPicture+"','"+sHref+"','"+countryCode+"')"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'0',message:'Success'}));
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

exports.Runner=run;


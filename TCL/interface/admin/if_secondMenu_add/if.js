var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var parentId = Param.params.parentId;
		var sId = Param.params.sId;
		var sName = Param.params.sName;
		var sHref = Param.params.sHref;
		var sPicture = Param.params.sPicture;
		var countryCode = Robot.Get("countryCode");
		
		var sql ="";
		if(sId=="new"){
			sql = "insert into MenuInfo(label,targetUrl,iconUrl,parentMenuUuid,createdAt,pageTag,countryCode) values('"+sName+"','"+sHref+"','"+sPicture+"','"+parentId+"',NOW(),'homepage','"+countryCode+"')";
		}else{
			sql = "update MenuInfo set label='"+sName+"',targetUrl='"+sHref+"',iconUrl='"+sPicture+"' where id='"+sId+"'";
		}
        var option={
			CN:TCL_SERVER_CN,
			sql:sql
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


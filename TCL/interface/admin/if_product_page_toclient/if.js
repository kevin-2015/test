var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var type = Param.params.type;
		var countryCode = Robot.Get("countryCode");
		var countryUrl = Robot.Get("countryUrl");
		var sql = "";
		if(type=="productpage"){
			sql = "select * from MenuInfo where type='ProductAd' and pageTag='productpage' and countryCode='"+countryCode+"'";
		}else if(type=="servicepage"){
			sql = "select * from MenuInfo where type='ServiceSupport' and pageTag='servicepage' and countryCode='"+countryCode+"'";
		}else if(type=="apppage"){
			sql = "select * from MenuInfo where type='APPS' and pageTag='apppage' and countryCode='"+countryCode+"'";
		}else if(type=="activitypage"){
			sql = "select * from  SystemActivity where countryCode='"+countryCode+"'";
		}
        var option={
			CN:TCL_SERVER_CN,
			sql:sql
		};
		var pageInfo = "";
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
		
				pageInfo = JSON.stringify({
					pageTag : type,
					pageData :{rows: rows}
				});
				var option2=
				{
					method : "POST",
					url : '127.0.0.1/'+"web_manager/page_data_add",
					Enctype : "application/x-www-form-urlencoded",
					Body : {"data":encodeURI(pageInfo)},
					Cookie : "true"
				};
				
				MEAP.AJAX.Runner(option2,function(err,res,data)
				{
					//console.log("------>",err,res,data);
				    if(err!='-1')
				    {
						Response.end(JSON.stringify({status:'0',message:'Success'}));
					}else{
						Response.end(JSON.stringify({status:'-1',message:'Error'}));
					}
				},Robot);	
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


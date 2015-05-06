var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var countryCode = Robot.Get("countryCode");
	var level = parseInt(Param.fields.level);
	var id = parseInt(Param.fields.id);
	
	try{
		if(level == 0){
			var selOption = {
				CN:TCL_SERVER_CN,
				sql:"SELECT * FROM `Category` WHERE `status` = 1 AND pid = "+id+" AND countryCode = '"+countryCode+"'"
			};
			MEAP.ODBC.Runner(selOption,function(err,rows,cols){
				if(err != -1 && rows[0]){
					Response.end(JSON.stringify({status:'-1',message:'DeleteSubCat'}));
				}else{
					var delOption={
						CN:TCL_SERVER_CN,
						sql:"DELETE FROM `Category` WHERE `id` = "+id+" AND countryCode = '"+countryCode+"'"
					};
					MEAP.ODBC.Runner(delOption,function(err,rows,cols){
						if(err != -1){
							Response.end(JSON.stringify({status:'0',message:"DeleteSuccess"}));
						}else{
							Response.end(JSON.stringify({status:'-1',message:'DeleteFail'}));
						}
					},Robot);
				}
			},Robot);
		}else{
			var delOption={
				CN:TCL_SERVER_CN,
				sql:"DELETE FROM `Category` WHERE `id` = "+id+" AND countryCode = '"+countryCode+"'"
			};
			MEAP.ODBC.Runner(delOption,function(err,rows,cols){
				if(err != -1){
					Response.end(JSON.stringify({status:'0',message:"DeleteSuccess"}));
				}else{
					Response.end(JSON.stringify({status:'-1',message:'DeleteFail'}));
				}
			},Robot);
		}
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;


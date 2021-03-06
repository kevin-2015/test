var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	
	try{
		var cats = Param.fields.cats;
		var orders = Param.fields.orders;
		
		var newcats = Param.fields.newcats;
		var neworders = Param.fields.neworders;
		
		var newsubcats = Param.fields.newsubcats;
		var newsuborders = Param.fields.newsuborders;
		
		if(Array.is_array(cats)) {
			var option={
				CN:TCL_SERVER_CN
			};
			for(var i in cats){
				option.sql = "UPDATE `Category` SET `name` = '"+cats[i]+"', `order` ="+orders[i]+" WHERE id = "+i;
				MEAP.ODBC.Runner(option,function(err,rows,cols){});
			}
		}
		
		if(Array.is_array(newcats)) {
			var option={
				CN:TCL_SERVER_CN
			};
			for(var i in newcats){
				option.sql = "INSERT INTO `Category`(`name`,`type`,`status`,`order`) VALUES('"+newcats[i]+"','news',1,"+neworders+")";
				MEAP.ODBC.Runner(option,function(err,rows,cols){});
			}
		}
		
		var len = newsubcats.length;
		if(Array.is_array(newsubcats)) {
			var option={
				CN:TCL_CN
			};
			for(var i in newsubcats){
				for(var j in newsubcats[i]){
					option.sql = "INSERT INTO `Category`(`pid`,`name`,`type`,`status`,`order`) values("+i+",'"+newsubcats[i][j]+"','news',1,"+newsuborders[i][j]+")";
					MEAP.ODBC.Runner(option,function(err,rows,cols){
						if(i == len-1){
							Response.end(JSON.stringify({status:'0',data:rows,message:'setSuccess'}));
						}
					});
				}
			}
		}
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
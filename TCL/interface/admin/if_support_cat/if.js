var MEAP=require("meap");
var odbc = require('meap_odbc');

function run(Param,Robot,Request,Response,IF)
{
	var countryCode = Robot.Get("countryCode");
	
	try{
		var db = new odbc.Database();
		db.openSync(TCL_SERVER_CN);
		
		var category = Param.fields;
		var tmp, num, obj ={};
		for(var i in category){
		        tmp = i.substring(0,i.indexOf('['));
		        if(!obj[tmp]){
		            obj[tmp] = {};
		        }
		        num = i.substring(i.indexOf('[')+1,i.length-1)||0;
		        if(num){
		            obj[tmp][num] = category[i];
		        }else{
		            obj[tmp] = category[i];
		        }
		}

		if(obj['cats']) {
			var cats = obj['cats'];
			var orders = obj['orders'];
			for(var i in cats){
				db.querySync("UPDATE `Category` SET `name` = '"+cats[i]+"', `order` ="+orders[i]+" WHERE id = "+i);
			}
		}
		if(obj['newcats']) {
			var newcats = obj['newcats'];
			var neworders = obj['neworders'];
			
			if(Array.isArray(obj['newcats'])){
				for(var i in newcats){
					db.querySync("INSERT INTO `Category`(`name`,`type`,`status`,`order`,`countryCode`) VALUES('"+newcats[i]+"','support',1,"+neworders[i]+",'"+countryCode+"')");
				}
			}else{
				db.querySync("INSERT INTO `Category`(`name`,`type`,`status`,`order`,`countryCode`) VALUES('"+newcats+"','support',1,"+neworders+",'"+countryCode+"')");
			}
		}

		if(obj['newsubcats']) {
			var newsubcats = obj['newsubcats'];
			var newsuborders = obj['newsuborders'];
			var len = newsubcats.length;
			for(var i in newsubcats){
				for(var j in newsubcats[i]){
					db.querySync("INSERT INTO `Category`(`pid`,`name`,`type`,`status`,`order`,`countryCode`) values("+i+",'"+newsubcats[i][j]+"','support',1,"+newsuborders[i][j]+",'"+countryCode+"')");
				}
			}
		}
		db.closeSync();
		Response.end(JSON.stringify({status:'0',message:'setSuccess'}));
	}
	catch(e)
	{
		db.closeSync();
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
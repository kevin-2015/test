var MEAP=require("meap");
var odbc = require('meap_odbc');

function run(Param,Robot,Request,Response,IF)
{
	var countrys = Param.fields.countrys;
	var roles = parseInt(Param.fields.roles);
	var username = Param.fields.username;
	var where = "WHERE a.`isFounder`= 0";

	if(countrys != ""){
		where += ' AND a.`countrys` like "%'+countrys+'%"';
	}
	if(roles){
		where += ' AND a.`roles` ='+roles;
	}
	if(username){
		where += ' AND a.`name` like "%'+username+'%"';
	}

	
	try{
		var db = new odbc.Database();
		db.openSync(TCL_SERVER_CN);

		var totalResult = db.querySync("SELECT count(a.`id`) AS total FROM `AdmUserInfo` AS a LEFT JOIN `AdmUserRole`  AS r ON a.role = r.id "+where);

		var adminList = db.querySync("SELECT a.*,DATE_FORMAT(a.createdAt ,'%Y-%m-%d %H:%i:%s') AS date , r.roleName FROM `AdmUserInfo` AS a LEFT JOIN `AdmUserRole`  AS r ON a.role = r.id "+where);

		var countryResult = db.querySync("SELECT * FROM `Country`");
		
		var countryList = {};
		for(var i in countryResult){
			countryList[countryResult[i]['countryCode']] = countryResult[i]['countryName'];
		}

		var countryArr;
		for(var i in adminList){
			countryArr = adminList[i]['countrys'].split(",");
			for(var j in countryArr){
				countryArr[j] = countryList[countryArr[j]];
			}

			adminList[i]['countryLang'] = countryArr.toString();
		}

		var result = {
			"total" : totalResult[0]['total'],
			"adminList" : adminList
		};
		
		db.closeSync();
		Response.end(JSON.stringify({status:'0',data:result}));
	}
	catch(e)
	{
		db.closeSync();
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
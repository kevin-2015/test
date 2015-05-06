var MEAP=require("meap");
var odbc = require('meap_odbc');
require("../Initialize.js");

function run(Param, Robot, Request, Response, IF){
	LOG5('---Param---',Param);
	var name = Param.fields.name;
	var price = Param.fields.price;
	var screenLevel = Param.fields.screenLevel;
	var brand = Param.fields.brand;
	var starlevel = Param.fields.starlevel;
	var shop = Param.fields.shop;
	var shopButton = Param.fields.shopButton;
	var findStore = Param.fields.findStore;
	var reviewFun = Param.fields.reviewFun;
	var reviewUrl = Param.fields.reviewUrl;
	var reviewContent = Param.fields.reviewContent;
//	var location = Param.fields.location;
	var countryCode = Robot.Get("countryCode");
	var description = Param.fields.description;
	var keyword = Param.fields.keyword;
	var status = 1;
	var listedTime = Param.fields.listedTime;

	var parameter = Param.fields.parameter;
	var paraValueArr = '';
	var parameterArr = '';
	var imgPath = Param.fields.imgPath;
	var imgvalueArr = '';
	var imgvalue = '';
	var countryUrl = Robot.Get("countryUrl");
	LOG5('----countryUrl-----',countryUrl);
	var db = new odbc.Database();
	db.openSync(TCL_SERVER_CN);
	db.beginTransactionSync();
	
	var into, last, param, attachment, paraValueArr, imgvalueArr;
	
	try {
		var sql = [];
//		for (var i = 0; i < Param.fields.location.length; i++) {
			into = db.querySync("INSERT INTO `ProductInfo` (`name`,`price`,`screenLevel`,`brand`,`starlevel`,`shop`,`findStore`,`reviewFun`,`countryCode`, `keyword`,`listedTime`,`description`,`status`,`shopButton`,`reviewUrl`,`reviewContent`) VALUES ('" + name + "','" + price + "','" + screenLevel + "','" + brand + "','" + starlevel + "','" + shop + "','" + findStore + "','" + reviewFun + "' ,'" + countryCode + "','"+keyword+"','"+listedTime+"','" + description + "','" + status + "','" + shopButton + "','" + reviewUrl + "','"+reviewContent+"')");
			
			last = db.querySync("SELECT LAST_INSERT_ID() AS LID");
			
			paraValueArr = '';
			for (var j = 0; j < parameter.length; j++) {
				parameterArr = parameter[j].split("_");
				paraValueArr += "('" + last[0]['LID'] + "','" + parameterArr[1] + "','" + parameterArr[0] + "'),";
			}
			param = db.querySync("INSERT INTO `ProductSpecInfo` ( `productId`,`parameterId`,`paraPid`) VALUES" + paraValueArr.substring(0, paraValueArr.length - 1));
			
			imgvalueArr = '';
			for (var k = 0; k < imgPath.length; k++) {
				imgvalue = imgPath[k].split(",");
				imgvalueArr += "('" + last[0]['LID'] + "','" + imgvalue[0] + "','" + imgvalue[1] + "'),";
			}
			attachment = db.querySync("INSERT INTO `ProductImageInfo` ( `productId`,`accessUrl`,`type`) VALUES" + imgvalueArr.substring(0, imgvalueArr.length - 1));
			
//		}
		
		db.commitTransactionSync();
		db.closeSync();

		var sql1 = "INSERT INTO `ProductInfo` (`id`,`name`,`price`,`screenLevel`,`brand`,`starlevel`,`shop`,`findStore`,`reviewFun`, `keyword`,`listedTime`,`description`,`status`,`shopButton`,`reviewUrl`,`reviewContent`) VALUES ('"+last[0]['LID']+"','" + name + "','" + price + "','" + screenLevel + "','" + brand + "','" + starlevel + "','" + shop + "','" + findStore + "','" + reviewFun + "','"+keyword+"','"+listedTime+"','" + description + "','" + status + "','" + shopButton + "','" + reviewUrl + "','"+reviewContent+"')";
		var sql2 = "INSERT INTO `ProductSpecInfo` ( `productId`,`parameterId`,`paraPid`) VALUES" + paraValueArr.substring(0, paraValueArr.length - 1)+";";
		var sql3 = "INSERT INTO `ProductImageInfo` ( `productId`,`accessUrl`,`type`) VALUES" + imgvalueArr.substring(0, imgvalueArr.length - 1)+";";
		LOG5('----SQL1---',escape(sql1));
		LOG5('----SQL2---',sql2);
		LOG5('----SQL3---',sql3);
		var option = {
	        method: "POST",
	        url: countryUrl+"/web_manager/product_add?sql1="+encodeURI(sql1)+"&sql2="+encodeURI(sql2)+"&sql3="+encodeURI(sql3),
	        Cookie: "true"
	    };
	    LOG5('----option---',option.url);
		encodeURI
		//encodeURIComponent
	    Response.setHeader("Content-type", "application/json;charset=utf8")
	    MEAP.AJAX.Runner(option, function(err, res, data){
	        data = JSON.parse(data);
	        if (err != -1 && data.status == "0") {
	            Response.end(JSON.stringify({
	                status: '0',
	                data: data.rows,
	                totalUsers: data.totalUsers
	            }));
	        }
	        else {
	            Response.end(JSON.stringify({
	                status: '-1',
	                message: 'Error'
	            }));
	        }
	    }, Robot);
		return;
		
		Response.end(JSON.stringify({status:'0', message:'addSuccess'}));
	}catch(e){
		db.rollbackTransactionSync();
		db.closeSync();
		
		
		Response.end(JSON.stringify({status:'0', message:'addFail'}));
	}
}
exports.Runner=run;

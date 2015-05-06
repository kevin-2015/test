var MEAP=require("meap");
var odbc = require('meap_odbc');

function run(Param,Robot,Request,Response,IF)
{
	try{
		var menuId = Param.params.menuId;
		var menuName = Param.params.menuName;
		var menuHref = Param.params.menuHref;
		var sStr = Param.params.sStr;
		
		console.log("menuId--->",menuId);
		console.log("menuName--->",menuName);
		console.log("menuHref--->",menuHref);
		console.log("sStr--->",sStr);
		
    	var db = new odbc.Database();
		db.openSync(TCL_SERVER_CN);
		db.beginTransactionSync();
		
		if(menuId=="new")
		{
			//新增主菜单,同时二级菜单也是新增
			var parentOper = db.querySync("insert into MenuInfo(label,targetUrl,createdAt) values('"+menuName+"','"+menuHref+"',NOW())");
			
			var lastId = db.querySync("SELECT LAST_INSERT_ID() AS LID");
		
			var sMenus = sStr.split(";");
			for(var i=0;i<sMenus.length;i++){
				var sMenu = sMenus[i].split("!");
				var sId = sMenu[0];
				var sName = sMenu[1];
				var sHref = sMenu[2];
				var sPicture = sMenu[3];
				if(sName!=null&sName!=""){
					db.querySync("insert into MenuInfo(label,targetUrl,iconUrl,createdAt,parentMenuUuid) values('"+sName+"','"+sHref+"','"+sPicture+"',NOW(),'"+lastId[0]['LID']+"')");
				}
			}
		}else
		{
			console.log("===>qqqqqqqqqqq");
			//已有主菜单，二级菜单可update,可新增
			var aaa= db.querySync("update MenuInfo set label='"+menuName+"',targetUrl='"+menuHref+"' where id='"+menuId+"'");
			var sMenus = sStr.split(";");
			for(var i=0;i<sMenus.length-1;i++)
			{
				var sMenu = sMenus[i].split("!");
				var sId = sMenu[0];
				var sName = sMenu[1];
				var sHref = sMenu[2];
				var sPicture = sMenu[3];
				if(sId=="new"){
					var bbb= db.querySync("insert into MenuInfo(label,targetUrl,iconUrl,createdAt,parentMenuUuid) values('"+sName+"','"+sHref+"','"+sPicture+"',NOW(),'"+menuId+"')");
				}else{
					db.querySync("update MenuInfo set label='"+sName+"',targetUrl='"+sHref+"',iconUrl='"+sPicture+"' where id='"+sId+"'");
				}
			}
		}
		db.commitTransactionSync();
		db.closeSync();
	
		
		Response.end(JSON.stringify({status:'0', message:'addSuccess'}));
	}
	catch(e)
	{
		db.rollbackTransactionSync();
		db.closeSync();
		
		
		Response.end(JSON.stringify({status:'-1', message:'addFail'}));
	}
}

exports.Runner=run;


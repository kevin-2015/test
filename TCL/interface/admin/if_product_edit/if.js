var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.editId;
	var name = Param.fields.proEditName;
	var price = Param.fields.proEditPrice;
	var screenLevel = Param.fields.proEditScreenLevel;
	var starlevel = Param.fields.proEditStarlevel;
	var keyword = Param.fields.keyword;
	
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"UPDATE `ProductInfo` SET `name` = '"+name+"',`price` = '"+price+"',`screenLevel` = '"+screenLevel+"',`starlevel` = '"+starlevel+"',`keyword` = '"+keyword+"' WHERE `id` = '"+id+"'"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'1',data:rows}));
			}else{
				Response.end(JSON.stringify({status:'0',message:'Error'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'0',message:'Error'}));
	}
	
	
	
//	var option = {
//		CN: TCL_SERVER_CN,
//		transaction: ["insert", "lastid", "add_specinfo"]
//	};
//	MEAP.ODBC.Transaction(option, function(context, item){
//		switch (item) {
//			case "updata_product":
//				return "UPDATE `ProductInfo` SET `Name` = '"+Name+"',`price` = '"+price+"',`screenLevel` = '"+screenLevel+"',`brand` = '"+brand+"',`starlevel` = '"+starlevel+"',`shop` = '"+shop+"',`findStore` = '"+findStore+"',`reviewFun` = '"+reviewFun+"',`location` = '"+location+"', `description` = '"+description+"',`status` = '"+status+"'  WHERE `id` = '"+id+"'";
//			case "delete_parameter":
//				return "DELETE FROM `ProductSpecInfo` WHERE `productId` = '"+id+"'";
//			case "add_specinfo":
//				for(var i=0;i<parameter.length;i++){
//					parameterArr = parameter[i].split("_");
//					paraValueArr += "('"+context.lastid+"','"+parameterArr[1]+"','"+date+"'),";
//				}
//				return "INSERT INTO `ProductSpecInfo` ( `productId`,`specValue`,`createdAt`) VALUES" + paraValueArr.substring(0,paraValueArr.length-1);
//		}
//	}, function(item, rows, context){
//		switch (item) {
//			case "insert":
//				break;
//			case "lastid":
//				context.lastid = rows[0].LID;
//				break;
//			case "add_specinfo":
//				break;
//		}
//		
//		Response.end(JSON.stringify({status:'0',data:''}));
//	}, function(err, data){
//		console.log(data[2]);
//	});
	
	
	
	
}

exports.Runner=run;


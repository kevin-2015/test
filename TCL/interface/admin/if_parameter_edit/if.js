var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.id;
	var name = Param.fields.name;
	var imgUrl = Param.fields.imgUrl;
	var setName = '';
	if(imgUrl){
		setName = ' ,imgUrl='+imgUrl;
	}
	try{
		var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM `ProductParameter` WHERE name='"+name+setName+"' AND id !="+id+";"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				if (rows[0]) {
					Response.end(JSON.stringify({status: '2',message: 'Error'}));
				}else {
					var option = {
						CN: TCL_SERVER_CN,
						sql: "UPDATE `ProductParameter` SET `name` = '" + name + "'  WHERE `id` = '" + id + "'"
					};
					MEAP.ODBC.Runner(option, function(err, rows, cols){
						if (!err) {
							Response.setHeader("Content-type", "application/json;charset=utf8")
							Response.end(JSON.stringify({status: '1',data: rows}));
						}else {
							Response.end(JSON.stringify({status: '0',message: 'Error'}));
						}
					}, Robot);
				}
			}else{
				Response.end(JSON.stringify({status:'0',message:'Error'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'0',message:'Error'}));
	}
}

exports.Runner=run;

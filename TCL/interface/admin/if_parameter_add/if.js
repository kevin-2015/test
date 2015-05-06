var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var name = Param.fields.name;
	var level = Param.fields.level;
	var pid = Param.fields.pid;
	var imgUrl = Param.params.imgUrl ? Param.params.imgUrl : '' ;
	try{
		var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM `ProductParameter` WHERE name='"+name+"';"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				if(rows[0]){
					Response.end(JSON.stringify({status:'2',message:'Error'}));
				}else{
					var option={
						CN:TCL_SERVER_CN,
						sql:"INSERT INTO `ProductParameter` ( `name`,`level`,`pid`,`imgUrl`) VALUES ('"+name+"','"+level+"','"+pid+"','"+imgUrl+"');"
					};
					MEAP.ODBC.Runner(option,function(err,rows,cols){
						if(!err){
							
							Response.end(JSON.stringify({status:'1',data:rows}));
						}else{
							Response.end(JSON.stringify({status:'0',message:'Error'}));
						}
					},Robot);
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


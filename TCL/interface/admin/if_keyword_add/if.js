var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	LOG5('--Param---',Param)
	var name = Param.fields.name;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"INSERT INTO `ProductKeyword` ( `name`) VALUES ('"+name+"');"
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
}

exports.Runner=run;


var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var cid = Param.fields.cid;
	var title = Param.fields.title;
	var summary = Param.fields.summary;
	var content = Param.fields.content;
	
	
	try{
        var option = {
			CN:TCL_SERVER_CN,
			sql:"INSERT INTO `Articles`(`cid`,`type`,`title`,`summary`,`content`) VALUES("+cid+",'about','"+title+"','"+summary+"','"+content+"')"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:rows,message:'addSuccess'}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'addFail'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
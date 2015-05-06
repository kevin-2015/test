var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var id = Param.fields.id;
	var cid = Param.fields.cid;
	var title = Param.fields.title;
	var summary = Param.fields.summary;
	var content = Param.fields.content;
	
	
	try{
        var option = {
			CN:TCL_SERVER_CN,
			sql:"UPDATE `Articles` SET cid="+cid+" ,type='about', title='"+title+"', summary='"+summary+"',content='"+content+"' WHERE id ="+id
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				Response.end(JSON.stringify({status:'0',data:rows,message:'updateSuccess'}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'updateFail'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;
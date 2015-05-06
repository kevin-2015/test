var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	var countryCode = Robot.Get("countryCode");
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM `Category` WHERE `type` = 'support' AND `status` = 1 AND countryCode = '"+countryCode+"' ORDER BY `id` ASC, `order` ASC"
		};
		
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(err != -1 && rows){
				var data = {};
				for(var i in rows){
					if(rows[i]['pid'] == 0){
						rows[i]['sub'] = [];
						data[rows[i]['id']] = rows[i];
					}else{
						data[rows[i]['pid']]['sub'].push(rows[i]);
					}
				}
				Response.end(JSON.stringify({status:'0',data:data}));
			}else{
				Response.end(JSON.stringify({status:'-1',message:'Error'}));
			}
		},Robot);
	}
	catch(e)
	{
		Response.end(JSON.stringify({status:'-1',message:'Error'}));
	}
}

exports.Runner=run;

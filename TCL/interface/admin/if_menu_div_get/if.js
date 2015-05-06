var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var type = Param.params.type;
		
		var countryCode = Robot.Get("countryCode");
		
        var option1={
			CN:TCL_SERVER_CN,
			sql:"select id,label,targetUrl from MenuInfo where type='"+type+"' and pageTag='homepage' and countryCode='"+countryCode+"'"
		};
		var menuParent = [];
		var menuSecond = [];
		var productList = [];
		MEAP.ODBC.Runner(option1,function(err,rows,cols)
		{
			if(!err)
			{
					menuParent.push(rows[0]);
					var menuId = rows[0].id;
					console.log("====menuId>",menuId);
					var option2 = {
						CN:TCL_SERVER_CN,
						sql:"select id,label,targetUrl,iconUrl from MenuInfo where parentMenuUuid='"+menuId+"' and pageTag='homepage' and countryCode='"+countryCode+"'"
					};
					var option3 = {
						CN:TCL_SERVER_CN,
						sql:"select id,name from ProductParameter where flag='category' and level='3'"
					};
					MEAP.ODBC.Runner(option3,function(err,rows,cols)
					{
						if(!err){
							if(rows.length>0)
							{
								for(var i=0;i<rows.length;i++)
								{
									productList.push(rows[i]);
								}
							}
						MEAP.ODBC.Runner(option2,function(err,rows,cols)
						{
							if(!err){
								if(rows.length>0){
									for(var j=0;j<rows.length;j++){
										menuSecond.push(rows[j]);
									}
								}
							
							Response.end(JSON.stringify({status:'1',menuParent:menuParent,menuSecond:menuSecond,productList:productList}));	
							}else{
								Response.end(JSON.stringify({status:'-1',message:'Error'}));
							}
						},Robot);
						}else{
							Response.end(JSON.stringify({status:'-1',message:'Error'}));
						}
					},Robot);	
			}else
			{
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


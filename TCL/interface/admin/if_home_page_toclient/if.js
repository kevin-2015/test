var MEAP=require("meap");
require("../Initialize.js");

function run(Param,Robot,Request,Response,IF)
{
	try{
		var countryUrl = Robot.Get("countryUrl");
		var countryCode = Robot.Get("countryCode");
        var option={
			CN:TCL_SERVER_CN,
			sql:"select * from MenuInfo where pageTag='homepage'  and countryCode='"+countryCode+"' order by parentMenuUuid"
		};
		var option1={
			CN:TCL_SERVER_CN,
			sql:"select * from Meta where meta_key like 'productRecommend%' and countryCode='"+countryCode+"'"
		};
		var pageInfo = "";
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			var menuItem = {};
			var firstAd = [];
			var prodCategory = [];
			var recommend =[];
			var serviceContent = [];
			var news = [];
			var video = [];
			if(!err)
			{
				for(var i=0;i<rows.length;i++)
				{
					if(rows[i].type=="Video"){
						video.push(rows[i]);
					}else if(rows[i].type=="News"){
						news.push(rows[i]);
					}else if(rows[i].type=="ServiceContent"){
						serviceContent.push(rows[i]);
					}else if(rows[i].type=="Recommendation"){
						recommend.push(rows[i]);
					}else if(rows[i].type=="ProductCategory"){
						prodCategory.push(rows[i]);
					}else if(rows[i].type=="FirstAdvertisement"){
						firstAd.push(rows[i]);
					}else
					{
						if(rows[i].parentMenuUuid==0)
						{
							//父级
							rows[i]['sub']=[];
							menuItem[rows[i]['id']]=rows[i];
						}else
						{
							menuItem[rows[i]['parentMenuUuid']]['sub'].push(rows[i]);
						}	
					}	
				}
				
				MEAP.ODBC.Runner(option1,function(err,rows,cols)
				{
					if(!err&rows.length>0)
					{
						for(var i=0;i<rows.length;i++)
						{
							rows[i]['meta_value']=JSON.parse(rows[i]['meta_value']);
							recommend.push(rows[i]);
						}
						
						var pageDataJson = {firstAd:firstAd,
													prodCategory:prodCategory,
													recommend:recommend,
													serviceContent:serviceContent,
													news:news,
													video:video,
													menuItem:menuItem};
					 console.log("===>",encodeURI(JSON.stringify(pageDataJson)));								
						
						pageInfo = {
							pageTag: 'homepage',
							pageData: JSON.stringify(pageDataJson)
						};
						var option2={
												method : "POST",
												url : '127.0.0.1/'+"web_manager/page_data_add",
												Enctype : "application/x-www-form-urlencoded",
												Body : {"data":encodeURI(pageInfo)},
												Cookie : "true"
											};
	
						MEAP.AJAX.Runner(option2,function(err,res,data){
						    if(err!='-1')
						    {
								data = JSON.parse(data);
								if(data.status=='0'){
									
									Response.end(JSON.stringify({status:'0',message:'Success'}));
								}else{
									Response.end(JSON.stringify({status:'-1',message:'Error'}));
								}
						    }
						    else
						    {
								Response.end(JSON.stringify({status:'-1',message:'Error'}));
						    }
						},Robot);
					}else
					{
						Response.end(JSON.stringify({status:'-1',message:'Error'}));
					}
				},Robot);
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


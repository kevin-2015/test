var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	//http://127.0.0.1:8080/tclServer/tcl/tcl/product_search_web?namekey=4&size=45&sizePara=16&cate=48&catePara=41&resolution=50&resolutionPara=42
	var namekey = Param.params.namekey;
	var size = Param.params.size;
	var sizePara = Param.params.sizePara;
	var cate = Param.params.cate;
	var catePara = Param.params.catePara;
	var resolution = Param.params.resolution;
	var resolutionPara = Param.params.resolutionPara;
	var kwyword = Param.params.kwyword;
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM ProductInfo p INNER JOIN ProductSpecInfo s ON p.id = s.productId WHERE (p.Name LIKE'%"+namekey+"%' OR p.description LIKE'%"+namekey+"%') AND ((s.specValue='"+size+"' AND s.parameterId='"+sizePara+"') OR (s.specValue='"+cate+"' AND s.parameterId='"+catePara+"') OR (s.specValue='"+resolution+"' AND s.parameterId='"+resolutionPara+"'))"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				LOG5('-----rows-----',rows);
				
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


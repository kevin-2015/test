var MEAP=require("meap");

var id = null;
var address = null;
var postcode = null;
var telphone = null;
function run(Param,Robot,Request,Response,IF)
{
	id = Param.fields.id;
	address = Param.fields.address;
	postcode = Param.fields.postcode;
	telphone = Param.fields.telphone;

	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"UPDATE `ShopInfo` SET `address` = '"+address+"',`postCode`='"+postcode+"',`contactPhone`='"+telphone+"'  WHERE `id` ="+id
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				
				Response.end(JSON.stringify({status:'1',data:rows}));
				postdata(Robot,Request,Response);
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
function postdata(Robot,Request,Response){
	var countryUrl = Robot.Get("countryUrl");
	 var option={
			method : "POST",
			url : countryUrl+"web_manager/storeAddress_update",
			Body:{oper:"update",pid:id,address:encodeURI(address),postCode:postcode,phone:telphone},
			Enctype:"application/x-www-form-urlencoded",
			Headers :{charset:"UTF-8"}
		};
		
		MEAP.AJAX.Runner(option,function(err,res,data){
		    if(!err)
		    {
				Response.end(JSON.stringify({
		                    status: '1',
							newid:id
		                }));
		    }
		    else
		    {
				Response.end(JSON.stringify({
	                    status: '0'
	                }));
		    }
		},Robot);
	
}
exports.Runner=run;


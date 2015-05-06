var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
	//
	if(country=="cn"){
		
	}
	else if(country == "en"){
		var id = Param.fields.id;
		var firstname = Param.fields.firstname;
		var lastname = Param.fields.lastname;
		var MobileNo = Param.fields.MobileNo;
		var TelNo =Param.fields.TelNo;
		var email = Param.fields.email;
		var streetaddress = Param.fields.streetaddress;
		var country = Param.fields.country;
		var state = Param.fields.state;
		var city = Param.fields.city;
		var productbrand = "02";//TCL brand
		var productcategory = "021";//TELEVISON
		var productfamily = Param.fields.productfamily;
		var modelno = Param.fields.modelno;
		var serialno = Param.fields.serialno||"na";
			var option={
					method : "POST",
					url : "http://210.75.9.14/crm_test/interface/insertcase.php",
					Body:{"firstname":firstname,"lastname":lastname,"MobileNo":MobileNo,"TelNo":TelNo,"email":email,"streetaddress":streetaddress,"country":country,"state":state,"city":city,"productbrand":productbrand,"productcategory":productcategory,"productfamily":productfamily,"modelno":modelno,"serialno":serialno},
					Enctype:"application/x-www-form-urlencoded"
				};
				
				MEAP.AJAX.Runner(option,function(err,res,data){
				    if(!err)
				    {
						//Add your normal handling code
						MEAP.PARSER.Runner("XML",data,function(err,da){
							repair_update(id,da.case.caseno);
						});
				    }
				    else
				    {
						Response.end("{'status':0,'message':'error'}");
				    }
				},Robot);
	}
}
/**
 * 调用网站报修保存caseid
 * @param {Object} id
 * @param {Object} caseid
 */
function repair_update(id,caseid){
	var countryUrl = Robot.Get("countryUrl");
	var option={
					method : "POST",
					url : countryUrl+"web_manager/repair_update",
					Body:{"id":id,"caseid":caseid},
					Enctype:"application/x-www-form-urlencoded"
				};
	MEAP.AJAX.Runner(option,function(err,res,data){
			    if(!err)
			    {
					//Add your normal handling code
					   var msg = {"status":1,"msg":"ok"};
					    Response.end(JSON.stringify(msg));
			    }
			    else
			    {
					Response.end("{'status':0,'message':'error'}");
			    }
			},Robot);
}

exports.Runner = run;


                                

	


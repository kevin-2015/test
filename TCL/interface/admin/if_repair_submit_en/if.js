var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF)
{
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
				var msg = {"status":1,"caseid":da.case.caseno}
				Response.end(JSON.stringify(msg));
			});
	    }
	    else
	    {
			Response.end("{'status':0}");
	    }
	},Robot);
}

exports.Runner = run;


                                

	


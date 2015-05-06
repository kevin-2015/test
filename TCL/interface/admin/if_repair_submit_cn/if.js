var MEAP=require("meap");

function run(Param, Robot, Request, Response, IF){
    /*
     * SOAP接口
     * option.wsdl     wsdl地址
     * option.func     wsdl方法
     * option.Params   请求参数
     * MEAP.SOAP.Runner(option,function(err,res,data),null)    option  请求的wsdl基本信息 ,res 目标的全部返回信息, data 返回的数据信息
     */
	var xml = '<?xml version="1.0" encoding="UTF-8"?><RECORDS><RECORD>'
					+'<dataid>111 </dataid>' 				
					+'<custname>bingfangzhu</custname>'
					+'<phonenumber>12388185812</phonenumber>'
					+'<province>广东</province>'
					+'<city>深圳</city> '
					+'<district>南山区</district>'
					+'<detailaddress>tcl国际E城</detailaddress>'
					+'<productbrand>4k高清</productbrand>'
					+'<productcategory>xxxx</productcategory>'
					+'<modelnumber></modelnumber>'
					+'<demandcategory></demandcategory>'
					+'<demanddesc></demanddesc>'
					+'<isdispatch>Y</isdispatch>'
					+'<infosrc></infosrc>'
					+'<inforemark></inforemark>'
					+'<textdata>xxxxxx</textdata>'
					+'</RECORD></RECORDS>';
    var option = {
        wsdl: "http://125.93.53.82:9001/webservice/transmitPort?wsdl",
        func: "transmitData",
        Params: {
            arg0: xml
        }
    };
    MEAP.SOAP.Runner(option, function(err, res, data){
        Response.end(JSON.stringify(data));
    }, null);
}

exports.Runner=run;


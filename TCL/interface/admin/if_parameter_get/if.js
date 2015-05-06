var MEAP=require("meap");

function run(Param,Robot,Request,Response,IF)
{
	try{
        var option={
			CN:TCL_SERVER_CN,
			sql:"SELECT * FROM ProductParameter WHERE status=1;"
		};
		MEAP.ODBC.Runner(option,function(err,rows,cols){
			if(!err){
				var dataCateOne = [];
				var dataCateTwo = [];
				var dataCateThr = [];
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].level == 1 && rows[i].pid == 0) {
						dataCateOne.push(rows[i]);
					}else	
					if(rows[i].level == 2 && rows[i].pid != 0){
						dataCateTwo.push(rows[i]);
					}else if(rows[i].level == 3 && rows[i].pid != 0){
						rows[i].pidId = rows[i].pid+'_'+rows[i].id;
						dataCateThr.push(rows[i]);
					}
		        }
//				var dataArr = [];
//				for (var i = 0; i < dataCateOne.length; i++) {
//					dataCateOne[i]['child'] = [];
//					dataArr[i] = dataCateOne[i];
//					for (var j = 0; j <dataCateTwo.length; j++) {
//						if (dataCateOne[i].id == dataCateTwo[j].pid) {
//							dataCateTwo[j]['childthr'] = [];
//							dataArr[i]['child'].push(dataCateTwo[j]); 
//							console.log('i:'+i+'--j:'+j);
//							for (var k = 0;k<dataCateThr.length;k++){
//								if (dataCateTwo[j].id == dataCateThr[k].pid) {
//									//dataArr[i]['child'][j]['childthr'].push(dataCateThr[k]);
//								}
//							}
//						}
//					}
//		        }
				
				Response.end(JSON.stringify({status:'1',dataCateOne:dataCateOne,dataCateTwo:dataCateTwo,dataCateThr:dataCateThr}));
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

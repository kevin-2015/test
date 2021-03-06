var MEAP = require("meap");

function run(Param, Robot, Request, Response, IF){
    var searchKey = Param.params.searchKey;
    var pageNum = Param.params.pageNum;
    var countryUrl = Robot.Get("countryUrl");
    
    var option = {
        method: "GET",
        url: countryUrl + "web_manager/user_list?searchKey="+searchKey+"&pageNum="+pageNum,
        Cookie: "true"
    };
    
    Response.setHeader("Content-type", "application/json;charset=utf8")
    MEAP.AJAX.Runner(option, function(err, res, data){
        data = JSON.parse(data);
        if (err != -1 && data.status == "0") {
            Response.end(JSON.stringify({
                status: '0',
                data: data.rows,
                totalUsers: data.totalUsers
            }));
        }
        else {
            Response.end(JSON.stringify({
                status: '-1',
                message: 'Error'
            }));
        }
    }, Robot);
}

exports.Runner = run;

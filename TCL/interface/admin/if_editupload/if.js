var MEAP = require("meap");
var fs = require("fs");
var path = require("path");

function run(Param, Robot, Request, Response, IF){
    var files = Param.files.img;

    try {
        var dt = new Date();
        var dirName = dt.getFullYear() + '-' + (dt.getMonth() + 1);
        var picture_path = path.join(__dirname, "../admin/", "attachments");
        fs.exists(picture_path, function(res){
            if (!res) {
                fs.mkdirSync(picture_path);
            }
            fs.exists(picture_path, function(isdir){
                if (isdir) {
                    fs.exists(picture_path + "/" + dirName, function(res){
                        if (!res) {
                            fs.mkdirSync(picture_path + "/" + dirName);
                        }
                        fs.exists(picture_path + "/" + dirName, function(isdir){
                            if (isdir) {
                                var type = files.name.substring(files.name.lastIndexOf('.'));
                                type = type.toLowerCase();
                                //var name = files.path.substring(files.path.lastIndexOf('/')) + type;
                                var name = new Date().getTime() + type;
                                var new_path = picture_path + "/" + dirName + "/" + name;
                                fs.rename(files.path, new_path, function(err){
                                    Response.setHeader("Content-type", "application/json;charset=utf-8");
                                    if (err == -1) {
                                        Response.end(JSON.stringify({
                                            status: 0,
                                            msg: 'uploadFail'
                                        }));
                                        return;
                                    }
                                    Response.end(JSON.stringify({
                                        status: 1,
                                        state: 'SUCCESS',
                                        message: "uploadSuccess",
                                        url: "./attachments/" + dirName + "/" + name,
                                        path: "./attachments/" + dirName + "/" + name
                                    }));
                                })
                            }
                            else {
                                Response.end(JSON.stringify({
                                    status: 0,
                                    message: 'createDirFail'
                                }));
                            }
                        });
                    });
                }
                else {
                    Response.end(JSON.stringify({
                        status: 0,
                        message: 'createDirFail'
                    }));
                }
            })
        })
    } 
    catch (e) {
        Response.end(JSON.stringify({
            status: 0,
            msg: e.message
        }));
    }
}

exports.Runner = run;

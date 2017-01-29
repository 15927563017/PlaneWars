'use strict';
var http = require('http');
var fs = require('fs');
var baseDir = 'E:/cocos2d-x-3.14/cocos2d-x-3.14/tools/cocos2d-console/bin/TankWar';
http.createServer(function(req,res){
	//console.log(req.url);
	var fileName = baseDir + req.url;
	var type = getType(fileName.substring(fileName.lastIndexOf('.')+1));
	fs.access(fileName,(err) => {
		if(err){
			console.log(fileName+' not dfexisted');
			return;
		}
		fs.readFile(fileName,(err,data) => {
			if(err){
				console.log(err);
				res.writeHead(404,{'Content-Type':'text/plain; charset="UTF-8"'});
				res.end(err);
				return;
			}
			//console.log(data);
			res.writeHead(200,{'Content-Type':type});
		    res.write(data);
		    res.end();
	    });
	});
	
	
}).listen(8080);

function getType(endTag){
    var type=null;
    switch(endTag){
    case 'html' :
    case 'htm' :
        type = 'text/html; charset=UTF-8';
        break;
    case 'js' : 
        type = 'application/javascript; charset="UTF-8"';
        break;
    case 'css' :
        type = 'text/css; charset="UTF-8"';
        break;
    case 'txt' :
        type = 'text/plain; charset="UTF-8"';
        break;
    case 'manifest' :
        type = 'text/cache-manifest; charset="UTF-8"';
        break;
    default :
        type = 'application/octet-stream';
        break;
    }
    return type;
}
console.log('server started..');
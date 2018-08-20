var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postRes = function(request,response){
    var ccavEncResponse='',
	ccavResponse='',
    workingKey = '1622084D568332A29D83B74482C228B1',		//Put in the 32-Bit key shared by CCAvenues.
	ccavPOST = '';

        request.on('data', function (data) {
          console.log("changes are for ccavResponse 1 "+data);
	    ccavEncResponse += data;
      console.log("changes are for ccavResponse 2 "+ccavEncResponse);
	    ccavPOST =  qs.parse(ccavEncResponse);
      console.log("changes are for ccavResponse 3 "+ccavPOST);
	    var encryption = ccavPOST.encResp;
      console.log("changes are for ccavResponse 4 "+encryption);
	    ccavResponse = ccav.decrypt(encryption,workingKey);
      console.log("changes are for ccavResponse 5 "+ccavResponse);
        });

        request.on('error', (err) => {
          // This prints the error message and stack trace to `stderr`.
          ccavEncResponse += data;
          ccavPOST =  qs.parse(ccavEncResponse);
          var encryption = ccavPOST.encResp;
          ccavResponse = ccav.decrypt(encryption,workingKey);
          console.log("error block changes are for ccavResponse "+ccavResponse);
          console.error(err.stack);
        });


	request.on('end', function () {
	    var pData = '';
	    pData = '<table border=1 cellspacing=2 cellpadding=2><tr><td>'
	    pData = pData + ccavResponse.replace(/=/gi,'</td><td>')
	    pData = pData.replace(/&/gi,'</td></tr><tr><td>')
	    pData = pData + '</td></tr></table>'
            htmlcode = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>'+ pData +'</center><br></body></html>';
            response.writeHeader(200, {"Content-Type": "text/html"});
	    response.write(htmlcode);
	    response.end();
	});
};

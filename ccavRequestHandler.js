var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
    workingKey = '1622084D568332A29D83B74482C228B1',		//Put in the 32-Bit key shared by CCAvenues.
  	accessCode = 'AVWR02FH22BH82RWHB',		//Put in the access code shared by CCAvenues.
	  encRequest = '',
	  formbody = '';

    request.on('data', function (data) {
	body += data;
  console.log("Plain Request: "+data);
	encRequest = ccav.encrypt(body,workingKey);
  console.log("Encrtyped Request: "+encRequest);
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });

    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	response.end();
    });
   return;
};

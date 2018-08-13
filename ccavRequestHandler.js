var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
    workingKey = 'B49B1DEC9CEAF71D1310E0736AB73E7A',		//Put in the 32-Bit key shared by CCAvenues.
  	accessCode = 'AVRT02FH02AU24TRUA',		//Put in the access code shared by CCAvenues.
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

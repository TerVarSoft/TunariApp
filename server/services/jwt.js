var crypto = require('crypto');

exports.encode = function(payload, secret){
	var algorithm = 'HS256';

	var header = {
		typ: 'JWT',
		alg: algorithm
	};

	var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));
	jwt += '.' + sign(jwt, secret);

	return jwt;
}

exports.decode = function(token, secret) {
	var segments = token.split('.');

	if(segments.length !== 3) {
		throw new Error("Token structure incorrect");
	}

	var header = JSON.parse(base64Decode(segments[0]));
	var payload = JSON.parse(base64Decode(segments[1]));

	var rawSignature = segments[0] + '.' + segments[1];

	if(!verify(rawSignature, secret, segments[2])){
		throw new Error("La verificacion ha fallado");
	}

	return payload;
}

function verify(raw, secret, signature) {
	console.log(signature === sign(raw, secret));
	return signature === sign(raw, secret);
}

function sign(str, key) {
	return crypto.createHmac('sha256', key).update(str).digest('base64');
}

function base64Encode(str) {
	return new Buffer(str).toString('base64');
}

function base64Decode(str) {
	return new Buffer(str, 'base64').toString();
}
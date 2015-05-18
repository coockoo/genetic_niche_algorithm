function encode (binary) {
	var gray = binary.slice(0, 1);
	for (var i = 1; i < binary.length; ++i) {
		gray[i] = binary[i - 1] ^ binary[i];
	}
	return gray;
}

function decode (gray) {
	var binary = gray.slice(0, 1);
	for (var i = 1; i < gray.length; ++i) {
		binary[i] = binary[i - 1] ^ gray[i];
	}
	return binary;
}

module.exports = {
	encode: encode,
	decode: decode
};

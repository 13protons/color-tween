var easingFunctions = require('./easingFunctions.js');

// Rewrite API with shorthand
easingFunctions = Object.keys(easingFunctions).reduce(function(acc, key, index){
  acc[key] = shorthand(easingFunctions[key]);
  return acc;
}, {})

module.exports = function(name) {
  // return easing function given a name like 'quibicInOut'
	var path = parseName(name);
	if (path.length === 1) {
		return easingFunctions[path[0]];
	}
	return easingFunctions[path[0]][path[1]];
}


function parseName(name) {
	// parse easing name into array
	// example: `qubic` becomes ['quibic']
	// example: `qubicInOut' becomes ['qubic', 'InOut'];

	var tests = [/InOut$/, /In$/, /Out$/];
	var found = tests.reduce(function(acc, reg, i) {
    var match = reg.exec(name);
    if (match && !acc) {
    	acc = match;
    }
    return acc;
  }, undefined);
  if (!found) {
  	return [name];
  }
  return [name.substr(0, found.index), found[0]];
}

function shorthand(ease){
	// Rewrites easing definition so that name() === name.InOut();
	var subject = ease.InOut;
	subject.In = ease.In;
	subject.Out = ease.Out;
	subject.InOut = ease.InOut;
	return subject;
}

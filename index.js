module.exports = function () {

	// The module is only loaded once, so we return a fresh function every time
		
	var actions = {};
	var aliases = {};

	return {

		add: function (name, /**...*/_aliases) {

			actions[name] = name;

			for (var i = 1, len = arguments.length; i < len; i++) {
				if (arguments[i]) {
					aliases[arguments[i]] = name;
				}
			}

			return this;
		},

		parse: function (/**Array=*/argv) {

			if (argv == null) {
				argv = Array.prototype.slice.call(process.argv, 2);
			}

			var results = {
				named: [],
				orphan: []
			};

			var currentAction = null;
			var currentActionData = null;

			for (var i = 0, len = argv.length, arg; i < len; i++) {
				arg = argv[i];
				if (arg[0] === '-' && arg[1] === '-') {
					currentAction = arg.slice(2) || null;
					currentActionData = currentAction ? {} : null;
					results.named.push({name: currentAction, args: currentActionData});
				}
				else if (arg[0] === '-' && arg[1] !== '-') {
					currentAction = aliases[arg.slice(1) || null] || null;
					currentActionData = currentAction ? {} : null;
					results.named.push({name: currentAction, args: currentActionData});
				}
				else {
					if (currentActionData) {
						var split1 = arg.indexOf(':'),
							split2 = arg.indexOf('='),
							split = split1 > -1 ? split1 : split2;
						if (split2 > -1 && split2 < split) {
							split = split2;
						}

						if (split > -1) {
							currentActionData[arg.substr(0, split)] = arg.substr(split + 1);
						} else {
							currentActionData[arg] = true;
						}
					}
					else {
						results.orphan.push(arg);
					}
				}
			}

			return results;
		}

	};

};
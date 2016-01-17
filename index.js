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
			var currentActionArgs = null;
			var currentActionArgsOrdered = null;

			for (var i = 0, len = argv.length, arg; i < len; i++) {
				arg = argv[i];
				if (arg[0] === '-' && arg[1] === '-') { // --ARG

					currentAction = arg.slice(2) || null;
					currentActionArgs = currentAction ? {} : null;
					currentActionArgsOrdered = currentAction ? [] : null;

					results.named.push({
						name: currentAction,
						args: currentActionArgs,
						ordered_args: currentActionArgsOrdered
					});
				}
				else if (arg[0] === '-' && arg[1] !== '-') { // -ARG

					currentAction = aliases[arg.slice(1)] || arg.slice(1);
					currentActionArgs = currentAction ? {} : null;
					currentActionArgsOrdered = currentAction ? [] : null;

					if (currentActionArgs) {
						results.named.push({
							name: currentAction,
							args: currentActionArgs,
							ordered_args: currentActionArgsOrdered
						});
					}
				}
				else {
					if (currentActionArgs) {
						var split1 = arg.indexOf(':'),
							split2 = arg.indexOf('='),
							split = split1 > -1 ? split1 : split2;
						if (split2 > -1 && split2 < split) {
							split = split2;
						}

						if (split > -1) {
							var argName = arg.substr(0, split),
								argValue = arg.substr(split + 1);
							currentActionArgs[argName] = argValue;
							currentActionArgsOrdered.push({ name: argName, value: argValue })
						} else {
							currentActionArgs[arg] = true;
							currentActionArgsOrdered.push({ value: arg })
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

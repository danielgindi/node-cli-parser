node-cli-parser
===============

[![npm Version](https://badge.fury.io/js/node-cli-parser.png)](https://npmjs.org/package/node-cli-parser)

This is a different kind of a CLI arguments parser.  
It does not conform to the standard UNIX way, but that's not what we always want.

The style that this module parses is like this:
`node server --function-name arg1:123 arg2=345 arg3 --another-function -f -fn`
Where `--` specifies "full" function names, and `-` specifies aliases that are usually shorter, one or two letters.
After each function, there can be specified arguments using `arg:value`, `arg=value` or `boolean_arg`.

Usage:
```javascript

var args = require('node-cli-parser')()
	.add('function-name', 'f' /* alias */, 'fn' /* alias */)
	.add('another-function')
	.parse(); // We can also pass an "argv" array as an argument to .parse()
		
console.log(args);
	-->
	{
		"named": [
			{
				"name": "function-name", 
				"args": {
					"arg1": "123",
					"arg2": "345",
					"arg3": true
				}, 
				"ordered_args": [
					{ "name": "arg1", "value": "123" },
					{ "name": "arg2", "value": "345" },
					{ "value": "arg3" }
				]
			},
			{
				"name": "another-function", 
				"args": { }
			},
			{
				"name": "function-name", // -f
				"args": { }
			},
			{
				"name": "function-name", // -fn
				"args": { }
			}
		],
		"orphan": [
			// These are arguments specified before any function
		]
	}
	
```

## Contributing

If you have anything to contribute, or functionality that you luck - you are more than welcome to participate in this!
If anyone wishes to contribute unit tests - that also would be great :-)

## Me
* Hi! I am Daniel Cohen Gindi. Or in short- Daniel.
* danielgindi@gmail.com is my email address.
* That's all you need to know.

## Help

If you like what you see here, and want to support the work being done in this repository, you could:
* Actually code, and issue pull requests
* Spread the word
* 
[![Donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=G4DXZS34VMS7A)

## License

All the code here is under MIT license. Which means you could do virtually anything with the code.
I will appreciate it very much if you keep an attribution where appropriate.

    The MIT License (MIT)

    Copyright (c) 2013 Daniel Cohen Gindi (danielgindi@gmail.com)

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

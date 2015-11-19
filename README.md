# lighter-spawn
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-spawn.svg)](//www.npmjs.com/package/lighter-spawn)
[![Downloads](https://img.shields.io/npm/dm/lighter-spawn.svg)](//www.npmjs.com/package/lighter-spawn)
[![Build](https://img.shields.io/travis/lighterio/lighter-spawn.svg)](//travis-ci.org/lighterio/lighter-spawn)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-spawn/master.svg)](//coveralls.io/r/lighterio/lighter-spawn)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

The `lighter-spawn` module is a lightweight child process spawning utility.

## Installation
From your project directory, install and save as a dependency:
```bash
npm install --save lighter-spawn
```

## API
The API is simply a function.

### spawn(command[, options])
Spawn a command, and return a child process object. The command is a string,
which can include arguments separated by spaces. If you would like to include a
space character inside an argument, use a backslash to escape it.

### Event: error
Pass an error object if a process exits with a nonzero exit code.

### Event: stderr
Pass a concatenated string of stderr stream data.

### Event: stdout
Pass a concatenated string of stdout stream data.

### Event: err
Pass an array of lines of stderr stream data.

### Event: out
Pass an array of lines of stdout stream data.

## Examples
For now, please see the [tests](https://github.com/lighterio/lighter-spawn/blob/master/test/type.js).

## More on lighter-spawn...
* [Contributing](//github.com/lighterio/lighter-spawn/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-spawn/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-spawn/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/lighter-spawn/blob/master/ROADMAP.md)

'use strict'
var spawn = require('child_process').spawn

/**
 * Execute a command by spawning a child process, and emit "stdout" and
 * "stderr" events with concatenated data.
 *
 * @param  {String} command   The command string, including arguments.
 * @param  {Object} options   An optional options object.
 * @return {Object}           A child process object.
 */
module.exports = function (command, options) {
  var args = command.split(' ')
  for (var i = 0, n = args.length - 1; i < n; i++) {
    var arg = args[i]
    var last = arg.length - 1
    if (arg[last] === '\\') {
      args.splice(i, 2, arg.substr(0, last) + ' ' + args[i + 1])
    }
  }

  var execPath = args.shift()
  var child = spawn(execPath, args, options)

  concatStream(child.stderr)
  concatStream(child.stdout)

  child.on('close', function onClose (exitCode) {
    if (exitCode > 0 && child._events.error) {
      var message = '`' + execPath + '` exited with code ' + exitCode + '.'
      var error = new Error(message)
      error.detail = {
        execPath: execPath,
        args: args,
        options: options,
        exitCode: exitCode
      }
      child.emit('error', error)
    }
    emit(child, 'stderr', 'err')
    emit(child, 'stdout', 'out')
  })

  return child
}

function concatStream (stream) {
  stream._data = ''
  stream.on('data', concatData)
  return stream
}

function concatData (chunk) {
  this._data += chunk
}

function emit (child, name, key) {
  var events = child._events
  var data = child[name]._data
  if (events[name]) {
    child.emit(name, data)
  }
  if (events[key]) {
    var string = data.trim()
    var array = string ? string.split('\n') : []
    child.emit(key, array)
  }
}

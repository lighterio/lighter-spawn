'use strict'
/* global describe it */
var spawn = require('../lighter-spawn')
var is = global.is || require('exam/lib/is')

describe('spawn', function () {
  it('emits "stderr", "stdout" and "close"', function (done) {
    var emitted = ''
    spawn('ls')
      .on('stderr', function (data) {
        emitted += 'stderr.'
        is(data, '')
      })
      .on('stdout', function (data) {
        emitted += 'stdout.'
        is.in(data, 'README.md')
      })
      .on('close', function () {
        is(emitted, 'stderr.stdout.')
        done()
      })
  })

  it('takes string arguments', function (done) {
    spawn('ls test')
      .on('stdout', function (data) {
        is.in(data, 'spawn-test.js')
        done()
      })
  })

  it('takes flag arguments', function (done) {
    spawn('ls -R')
      .on('stdout', function (data) {
        is.in(data, 'README.md')
        is.in(data, 'spawn-test.js')
        done()
      })
  })

  it('respects spaces when preceeded by backslashes', function (done) {
    spawn('./test/echo.sh hi\\ there.')
      .on('stdout', function (data) {
        is(data, 'hi there.\n')
        done()
      })
  })

  it('emits stderr content', function (done) {
    spawn('ls NOPE')
      .on('stderr', function (data) {
        is(data, 'ls: NOPE: No such file or directory\n')
        done()
      })
  })

  it('emits errors', function (done) {
    var options = {}
    spawn('ls NOPE', options)
      .on('error', function (error) {
        var detail = error.detail
        is(detail.execPath, 'ls')
        is.same(detail.args, ['NOPE'])
        is(detail.options, options)
        is(detail.exitCode, 1)
        done()
      })
  })

  it('emits arrays', function (done) {
    var options = {}
    spawn('ls NOPE', options)
      .on('err', function (lines) {
        is.same(lines, ['ls: NOPE: No such file or directory'])
      })
      .on('out', function (lines) {
        is.same(lines, [])
        done()
      })
  })
})

/*eslint-disable no-console */
const test = require('ava');
const twitchdown = require('../index');
const mock = require('mock-require');
const sinon = require('sinon');
const twitchSpy = sinon.spy(twitchdown);
const exampleResult = require('./example.output.js');

test.before(() => {
  mock('twitchdown', twitchSpy);
})

test('ensure the example code runs', (t) => {
  const realLog = console.log;
  let output;
  console.log = (message) => {
    output = message
  };
  require('../example');
  t.is(1, twitchSpy.callCount);
  t.deepEqual(exampleResult, output, 'script output');
  console.log = realLog;
});


/* eslint-disable no-console */
const { test } = require('node:test');
const assert = require('node:assert');
const exampleResult = require('./example.output.js');

test('ensure the example code runs', () => {
  let output;

  const originalLog = console.log;
  console.log = (message) => {
    output = message;
  };

  try {
    delete require.cache[require.resolve('../example')];
    require('../example');

    assert.deepStrictEqual(exampleResult, output, 'script output');
  } finally {
    console.log = originalLog;
  }
});


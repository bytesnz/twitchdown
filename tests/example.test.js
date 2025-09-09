/*eslint-disable no-console */
const { test } = require('node:test');
const assert = require('node:assert');
const exampleResult = require('./example.output.js');

test('ensure the example code runs', (t) => {
  let callCount = 0;
  let output;

  // Mock console.log to capture output
  const mockLog = t.mock.fn((message) => {
    output = message;
  });

  const originalLog = console.log;
  console.log = mockLog;

  // Mock twitchdown module
  const originalTwitchdown = require('../index');
  const mockTwitchdown = t.mock.fn((...args) => {
    callCount++;
    return originalTwitchdown(...args);
  });

  // Replace the module in require cache
  const moduleId = require.resolve('../index');
  const originalModule = require.cache[moduleId];
  require.cache[moduleId] = {
    ...originalModule,
    exports: mockTwitchdown
  };

  try {
    // Clear example from cache and require it
    delete require.cache[require.resolve('../example')];
    require('../example');

    assert.strictEqual(1, callCount);
    assert.deepStrictEqual(exampleResult, output, 'script output');
  } finally {
    console.log = originalLog;
    require.cache[moduleId] = originalModule;
  }
});


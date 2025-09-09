/* eslint-disable no-console */
const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');
const { readFileSync } = require('fs');
const { h } = require('preact');
const { resolve } = require('path');

test('that it renders using React without any errors', () => {
  const old = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  };

  const logs = [];
  const newLog = (level) => (...messages) => logs.push({
    level,
    messages
  });

  console.log = newLog('log');
  console.warn = newLog('warn');
  console.error = newLog('error');
  console.debug = newLog('debug');

  try {
    const markdown = readFileSync(resolve(__dirname, '../README.md')).toString();

    h('p', {}, twitchdown(markdown, {
      createElement: h
    }));

    assert.deepStrictEqual([], logs, 'No logs created');
  } finally {
    console.log = old.log;
    console.warn = old.warn;
    console.error = old.error;
    console.debug = old.debug;
  }
});


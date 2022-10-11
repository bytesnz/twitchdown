/* eslint-disable no-console */
const test = require('ava');
const twitchdown = require('../index');
const { readFileSync } = require('fs');
const { h } = require('preact');
const { resolve } = require('path');

test.beforeEach((t) => {
  t.context.old = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  };

  t.context.logs = [];
  const newLog = (level) => (...messages) => t.context.logs.push({
    level,
    messages
  });

  console.log = newLog('log');
  console.warn = newLog('warn');
  console.error = newLog('error');
  console.debug = newLog('debug');
});

test.afterEach((t) => {
  console.log = t.context.old.log;
  console.warn = t.context.old.warn;
  console.error = t.context.old.error;
  console.debug = t.context.old.debug;
});

test('that it renders using React without any errors', (t) => {
  const markdown = readFileSync(resolve(__dirname, '../README.md')).toString();

  h('p', {}, twitchdown(markdown, {
    createElement: h
  }));

  if (t.context.logs.length) {
    t.log(t.context.logs);
  }
  t.deepEqual([], t.context.logs, 'No logs created');
});


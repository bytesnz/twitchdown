const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('should parse ---', () => {
  assert.deepStrictEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n\n---\nbar'));
  assert.deepStrictEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n\n----\nbar'), '----');
  assert.deepStrictEqual([
    { type: 'blockquote', props: { key: 0 }, children: [ 'foo' ] },
    { type: 'hr', props: { key: 1 } },
    'bar'
  ], twitchdown('> foo\n\n---\nbar'));
});

test('should parse * * *', () => {
  assert.deepStrictEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n* * *\nbar'));
  assert.deepStrictEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n* * * *\nbar'), '* * * *');
  assert.deepStrictEqual([
    { type: 'blockquote', props: { key: 0 }, children: [ 'foo' ] },
    { type: 'hr', props: { key: 1 } },
    'bar'
  ], twitchdown('> foo\n\n* * *\nbar'));
});


const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('parses bold with **', () => {
  assert.deepStrictEqual([ 'I ', { type: 'strong', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I **like** tiny libraries'));
});

test('parses bold with __', () => {
  assert.deepStrictEqual([ 'I ', { type: 'strong', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I __like__ tiny libraries'));
});

test('parses italics with *', () => {
  assert.deepStrictEqual([ 'I ', { type: 'em', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I *like* tiny libraries'));
});

test('parses italics with _', () => {
  assert.deepStrictEqual([ 'I ', { type: 'em', props: { key: 1 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('I _like_ tiny libraries'));
});

test('parses bold with ** and a block before', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'strong', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI **like** tiny libraries'));
});

test('parses bold with __ and a block before', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'strong', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI __like__ tiny libraries'));
});

test('parses italics with * and a block before', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'em', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI *like* tiny libraries'));
});

test('parses italics with _ and a block before', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'Header' ] }, 'I ', { type: 'em', props: { key: 2 }, children: [ 'like' ] }, ' tiny libraries' ], twitchdown('# Header\nI _like_ tiny libraries'));
});

const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('should close unclosed tags', () => {
  assert.deepStrictEqual([ { type: 'em', props: { key: 0 }, children: [ 'foo' ] } ], twitchdown('*foo'));
  assert.deepStrictEqual([ 'foo', { type: 'strong', props: { key: 0 }, children: [] } ], twitchdown('foo**'));
  assert.deepStrictEqual([
    { type: 'a', props: { key: 0 , href: '#winning' }, children: [
      'some ',
      { type: 'strong', props: { key: 1 }, children: [ 'bold text' ] }
    ] }
  ], twitchdown('[some **bold text](#winning)'));
  assert.deepStrictEqual([ '`foo' ], twitchdown('`foo'));
});

test('should not choke on single characters', () => {
  assert.deepStrictEqual([ { type: 'em', props: { key: 0 }, children: [] } ], twitchdown('*'));
  assert.deepStrictEqual([ { type: 'em', props: { key: 0 }, children: [] } ], twitchdown('_'));
  assert.deepStrictEqual([ { type: 'strong', props: { key: 0 }, children: [] } ], twitchdown('**'));
  assert.deepStrictEqual([ '>' ], twitchdown('>'));
  assert.deepStrictEqual([ '`' ], twitchdown('`'));
});


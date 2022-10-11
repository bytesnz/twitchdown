const test = require('ava');
const twitchdown = require('../index');

test('should close unclosed tags', (t) => {
  t.deepEqual([ { type: 'em', props: { key: 0 }, children: [ 'foo' ] } ], twitchdown('*foo'));
  t.deepEqual([ 'foo', { type: 'strong', props: { key: 0 }, children: [] } ], twitchdown('foo**'));
  t.deepEqual([
    { type: 'a', props: { key: 0 , href: '#winning' }, children: [
      'some ',
      { type: 'strong', props: { key: 1 }, children: [ 'bold text' ] }
    ] }
  ], twitchdown('[some **bold text](#winning)'));
  t.deepEqual([ '`foo' ], twitchdown('`foo'));
});

test('should not choke on single characters', (t) => {
  t.deepEqual([ { type: 'em', props: { key: 0 }, children: [] } ], twitchdown('*'));
  t.deepEqual([ { type: 'em', props: { key: 0 }, children: [] } ], twitchdown('_'));
  t.deepEqual([ { type: 'strong', props: { key: 0 }, children: [] } ], twitchdown('**'));
  t.deepEqual([ '>' ], twitchdown('>'));
  t.deepEqual([ '`' ], twitchdown('`'));
});


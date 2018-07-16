import test from 'ava';
import twitchdown from '../index';

test.only('should close unclosed tags', (t) => {
  t.deepEqual([ { type: 'em', props: null, children: [ 'foo' ] } ], twitchdown('*foo'));
  t.deepEqual([ 'foo', { type: 'strong', props: null, children: [] } ], twitchdown('foo**'));
  t.deepEqual([
    { type: 'a', props: { href: '#winning' }, children: [
      'some ',
      { type: 'strong', props: null, children: [ 'bold text' ] }
    ] }
  ], twitchdown('[some **bold text](#winning)'));
  t.deepEqual([ '`foo' ], twitchdown('`foo'));
});

test('should not choke on single characters', (t) => {
  t.deepEqual([ { type: 'em', props: null, children: [] } ], twitchdown('*'));
  t.deepEqual([ { type: 'em', props: null, children: [] } ], twitchdown('_'));
  t.deepEqual([ { type: 'strong', props: null, children: [] } ], twitchdown('**'));
  t.deepEqual([ '>' ], twitchdown('>'));
  t.deepEqual([ '`' ], twitchdown('`'));
});


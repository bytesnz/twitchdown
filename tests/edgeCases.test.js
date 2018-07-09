import test from 'ava';
import reactdown from '../';

test.only('should close unclosed tags', (t) => {
  t.deepEqual([ { type: 'em', props: null, children: [ 'foo' ] } ], reactdown('*foo'));
  t.deepEqual([ 'foo', { type: 'strong', props: null, children: [] } ], reactdown('foo**'));
  t.deepEqual([
    { type: 'a', props: { href: '#winning' }, children: [
      'some ',
      { type: 'strong', props: null, children: [ 'bold text' ] }
    ] }
  ], reactdown('[some **bold text](#winning)'));
  t.deepEqual([ '`foo' ], reactdown('`foo'));
});

test('should not choke on single characters', (t) => {
  t.deepEqual([ { type: 'em', props: null, children: [] } ], reactdown('*'));
  t.deepEqual([ { type: 'em', props: null, children: [] } ], reactdown('_'));
  t.deepEqual([ { type: 'strong', props: null, children: [] } ], reactdown('**'));
  t.deepEqual([ '>' ], reactdown('>'));
  t.deepEqual([ '`' ], reactdown('`'));
});


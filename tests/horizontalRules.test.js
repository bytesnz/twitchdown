import test from 'ava';
import twitchdown from '../';

test('should parse ---', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('foo\n\n---\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('foo\n\n----\nbar'), '----');
  t.deepEqual([
    { type: 'blockquote', props: null, children: [ 'foo' ] },
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('> foo\n\n---\nbar'));
});

test('should parse * * *', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('foo\n* * *\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('foo\n* * * *\nbar'), '* * * *');
  t.deepEqual([
    { type: 'blockquote', props: null, children: [ 'foo' ] },
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], twitchdown('> foo\n\n* * *\nbar'));
});


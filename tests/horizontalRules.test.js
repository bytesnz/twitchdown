import test from 'ava';
import twitchdown from '../index';

test('should parse ---', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n\n---\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n\n----\nbar'), '----');
  t.deepEqual([
    { type: 'blockquote', props: { key: 0 }, children: [ 'foo' ] },
    { type: 'hr', props: { key: 1 } },
    'bar'
  ], twitchdown('> foo\n\n---\nbar'));
});

test('should parse * * *', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n* * *\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: { key: 0 } },
    'bar'
  ], twitchdown('foo\n* * * *\nbar'), '* * * *');
  t.deepEqual([
    { type: 'blockquote', props: { key: 0 }, children: [ 'foo' ] },
    { type: 'hr', props: { key: 1 } },
    'bar'
  ], twitchdown('> foo\n\n* * *\nbar'));
});


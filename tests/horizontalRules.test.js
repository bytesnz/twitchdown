import test from 'ava';
import reactdown from '../';

test('should parse ---', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('foo\n\n---\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('foo\n\n----\nbar'), '----');
  t.deepEqual([
    { type: 'blockquote', props: null, children: [ 'foo' ] },
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('> foo\n\n---\nbar'));
});

test('should parse * * *', (t) => {
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('foo\n* * *\nbar'));
  t.deepEqual([
    'foo',
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('foo\n* * * *\nbar'), '* * * *');
  t.deepEqual([
    { type: 'blockquote', props: null, children: [ 'foo' ] },
    { type: 'hr', props: undefined, children: undefined },
    'bar'
  ], reactdown('> foo\n\n* * *\nbar'));
});


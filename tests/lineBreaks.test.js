import test from 'ava';
import reactdown from '../';

test('parses two new lines as line breaks', (t) => {
  t.deepEqual([ 'Something with',
      { type: 'br', props: undefined, children: undefined },
      'a line break' ], reactdown('Something with\n\na line break'));
});

test('parses two spaces as a line break', (t) => {
  t.deepEqual([ 'Something with',
      { type: 'br', props: undefined, children: undefined },
      'a line break' ], reactdown('Something with  \na line break'));
});


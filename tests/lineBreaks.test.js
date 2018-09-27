import test from 'ava';
import twitchdown from '../index';

test('parses two new lines as line breaks', (t) => {
  t.deepEqual([ 'Something with',
      { type: 'br', props: { key: 0 }, children: undefined },
      'a line break' ], twitchdown('Something with\n\na line break'));
});

test('parses two spaces as a line break', (t) => {
  t.deepEqual([ 'Something with',
      { type: 'br', props: { key: 0 }, children: undefined },
      'a line break' ], twitchdown('Something with  \na line break'));
});


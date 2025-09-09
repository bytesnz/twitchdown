const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('parses two new lines as line breaks', () => {
  assert.deepStrictEqual([ 'Something with',
      { type: 'br', props: { key: 0 } },
      'a line break' ], twitchdown('Something with\n\na line break'));
});

test('parses two spaces as a line break', () => {
  assert.deepStrictEqual([ 'Something with',
      { type: 'br', props: { key: 0 } },
      'a line break' ], twitchdown('Something with  \na line break'));
});


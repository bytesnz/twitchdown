const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('parses H1 titles', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like tiny libraries' ] } ], twitchdown('# I like tiny libraries'));
});

test('parses underlined H1 titles', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like tiny libraries' ] } ], twitchdown('I like tiny libraries\n==='));
});

test('parses H2 titles', () => {
  assert.deepStrictEqual([ { type: 'h2', props: { key: 0 }, children: ['I like tiny libraries'] } ], twitchdown('## I like tiny libraries'));
});

test('parses H3 titles', () => {
  assert.deepStrictEqual([ { type: 'h3', props: { key: 0 }, children: ['I like tiny libraries'] } ], twitchdown('### I like tiny libraries'));
});

test('headingOffset offsets titles', () => {
  assert.deepStrictEqual([ { type: 'h4', props: { key: 0 }, children: ['I like tiny libraries'] } ], twitchdown('### I like tiny libraries', { headingOffset: 1 }));
});

test('parses titles with reference links', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like ', {
  type: 'a', props: { key: 0, href: 'https://example.com' }, children: [ 'tiny libraries' ]
  } ] } ],
    twitchdown('# I like [tiny libraries]\n\n[tiny libraries]: https://example.com')
  );
});

test('adds id to heading tags if headingIds option given', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [ 'I like tiny libraries' ] } ],
      twitchdown('# I like tiny libraries', { headingIds: true }), 'h1');

  assert.deepStrictEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [ 'I like tiny libraries' ] } ],
      twitchdown('I like tiny libraries\n===', { headingIds: true }), 'underlined heading');

  assert.deepStrictEqual([ { type: 'h2', props: { key: 0, id: 'i-like-tiny-libraries' }, children: ['I like tiny libraries'] } ],
      twitchdown('## I like tiny libraries', { headingIds: true }), 'h2');

  assert.deepStrictEqual([ { type: 'h3', props: { key: 0, id: 'i-like-tiny-libraries' }, children: ['I like tiny libraries'] } ],
      twitchdown('### I like tiny libraries', { headingIds: true }), 'h3');

  assert.deepStrictEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [
    'I ',
    { type: 'code', props: { key: 0 }, children: [ 'like' ] },
    ' tiny libraries'
  ] } ], twitchdown('# I `like` tiny libraries', { headingIds: true }), 'coded heading');

  assert.deepStrictEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [
    { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'I like tiny libraries' ] }
  ] } ], twitchdown('# [I like tiny libraries](http://example.com)', { headingIds: true }), 'url heading');

  assert.deepStrictEqual([ { type: 'h1', props: { key: 0, id: 'this-image' }, children: [
    'This image ',
    { type: 'img', props: { key: 0, src: 'image.png', alt: 'description', title: 'description' } }
  ] } ], twitchdown('# This image ![description](image.png)', { headingIds: true }), 'image heading');
});

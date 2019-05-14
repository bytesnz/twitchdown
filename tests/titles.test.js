import test from 'ava';
import twitchdown from '../index';

test('parses H1 titles', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like tiny libraries' ] } ], twitchdown('# I like tiny libraries'));
});

test('parses underlined H1 titles', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like tiny libraries' ] } ], twitchdown('I like tiny libraries\n==='));
});

test('parses H2 titles', (t) => {
  t.deepEqual([ { type: 'h2', props: { key: 0 }, children: ['I like tiny libraries'] } ], twitchdown('## I like tiny libraries'));
});

test('parses H3 titles', (t) => {
  t.deepEqual([ { type: 'h3', props: { key: 0 }, children: ['I like tiny libraries'] } ], twitchdown('### I like tiny libraries'));
});

test('parses titles with reference links', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: [ 'I like ', {
  type: 'a', props: { key: 0, href: 'https://example.com' }, children: [ 'tiny libraries' ]
  } ] } ],
    twitchdown('# I like [tiny libraries]\n\n[tiny libraries]: https://example.com')
  );
});

test('adds id to heading tags if headingIds option given', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [ 'I like tiny libraries' ] } ],
      twitchdown('# I like tiny libraries', { headingIds: true }), 'h1');

  t.deepEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [ 'I like tiny libraries' ] } ],
      twitchdown('I like tiny libraries\n===', { headingIds: true }), 'underlined heading');

  t.deepEqual([ { type: 'h2', props: { key: 0, id: 'i-like-tiny-libraries' }, children: ['I like tiny libraries'] } ],
      twitchdown('## I like tiny libraries', { headingIds: true }), 'h2');

  t.deepEqual([ { type: 'h3', props: { key: 0, id: 'i-like-tiny-libraries' }, children: ['I like tiny libraries'] } ],
      twitchdown('### I like tiny libraries', { headingIds: true }), 'h3');

  t.deepEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [
    'I ',
    { type: 'code', props: { key: 0 }, children: [ 'like' ] },
    ' tiny libraries'
  ] } ], twitchdown('# I `like` tiny libraries', { headingIds: true }), 'coded heading');

  t.deepEqual([ { type: 'h1', props: { key: 0, id: 'i-like-tiny-libraries' }, children: [
    { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'I like tiny libraries' ] }
  ] } ], twitchdown('# [I like tiny libraries](http://example.com)', { headingIds: true }), 'url heading');

  t.deepEqual([ { type: 'h1', props: { key: 0, id: 'this-image' }, children: [
    'This image ',
    { type: 'img', props: { key: 0, src: 'image.png', alt: 'description', title: 'description' } }
  ] } ], twitchdown('# This image ![description](image.png)', { headingIds: true }), 'image heading');
});

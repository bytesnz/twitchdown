import test from 'ava';
import twitchdown from '../index';

test('wraps text in a paragraph if enabled', (t) => {
  t.deepEqual([ { type: 'p', props: { key: 0 }, children: [ 'hello' ] } ], twitchdown('hello', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'p', props: { key: 1 }, children: [ 'test' ] },
    { type: 'p', props: { key: 2 }, children: [ 'test again' ] }
  ], twitchdown('hello\n<p>test</p>\n<p>test again</p>', {
    paragraphs: true
  }));
});

test('doesn\'t wrap headings, code blocks, lists, custom tags and html tags (if separate) in paragraphs', (t) => {
  t.deepEqual([
    { type: 'h1', props: { key: 0 }, children: [ 'heading' ] },
    { type: 'p', props: { key: 1 }, children: [ 'hello you' ] },
    { type: 'h2', props: { key: 2 }, children: [ 'subheading' ] },
    { type: 'p', props: { key: 3 }, children: [ 'bye' ] }
  ], twitchdown('#heading\nhello\n you\n##subheading\nbye', {
    paragraphs: true
  }), 'headings');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'blockquote', props: { key: 1 }, children: [ 'quote' ] },
    { type: 'p', props: { key: 2 }, children: [ 'bye' ] }
  ], twitchdown('hello\n> quote\nbye', {
    paragraphs: true
  }), 'blockquotes');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'hr', props: { key: 1 } },
    { type: 'p', props: { key: 2 }, children: [ 'bye' ] }
  ], twitchdown('hello\n* * *\nbye', {
    paragraphs: true
  }), 'horizontal rules');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'ul', props: { key: 2 }, children: [
      { type: 'li', props: { key: 1 }, children: [ 'item' ] }
    ] },
    { type: 'p', props: { key: 3 }, children: [ 'bye' ] }
  ], twitchdown('hello \n- item\nbye', {
    paragraphs: true
  }), 'lists');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'pre', props: { key: 1, className: 'code poetry' }, children: [ 'something\nelse' ] },
    { type: 'p', props: { key: 2 }, children: [ 'bye' ] }
  ], twitchdown('hello\n\tsomething\n\telse\nbye', {
    paragraphs: true
  }), 'quote blocks');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'pre', props: { key: 1, className: 'code' }, children: [ 'something' ] },
    { type: 'p', props: { key: 2 }, children: [ 'bye' ] }
  ], twitchdown('hello\n```\nsomething\n```\nbye', {
    paragraphs: true
  }), 'code blocks');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    'Custom tag'
  ], twitchdown('hello\n{@custom}', {
    paragraphs: true,
    customTags: {
      custom: () => `Custom tag`
    }
  }), 'custom tags');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [ 'hello' ] },
    { type: 'test', props: { key: 1 }, children: [ 'something' ] },
    { type: 'p', props: { key: 2 }, children: [ 'bye' ] }
  ], twitchdown('hello\n\n<test>something</test>\n\nbye', {
    paragraphs: true
  }), 'html tags if separate');
});

test('Puts links, images, inline formatting, html tags (if inline) and single quote code in paragraphs', (t) => {
  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      'test ',
      { type: 'a', props: { key: 1, href: '#test' }, children: [ 'link' ] },
      ' again'
    ] }
  ], twitchdown('test [link](#test) again', {
    paragraphs: true
  }), 'link in text');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      { type: 'a', props: { key: 1, href: '#test' }, children: [ 'link' ] },
      ' woot'
    ] }
  ], twitchdown('[link](#test) woot', {
    paragraphs: true
  }), 'link at start of text');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      'hello ',
      { type: 'em', props: { key: 2 }, children: [ 'something' ] },
      ' bye'
    ] }
  ], twitchdown('hello *something* bye', {
    paragraphs: true
  }), 'inline formatting');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      { type: 'em', props: { key: 2 }, children: [ 'something' ] },
      ' bye'
    ] }
  ], twitchdown('*something* bye', {
    paragraphs: true
  }), 'inline formatting');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      'test ',
      { type: 'img', props: { key: 1, src: 'image.png', alt: 'image', title: 'image' } },
      ' again'
    ] }
  ], twitchdown('test ![image](image.png) again', {
    paragraphs: true
  }), 'text then image');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      { type: 'img', props: { key: 1, src: 'image.png', alt: 'image', title: 'image' } },
      ' woot'
    ] }
  ], twitchdown('![image](image.png) woot', {
    paragraphs: true
  }), 'image then text');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      { type: 'code', props: { key: 1 }, children: [ 'something' ] },
    ] }
  ], twitchdown('`something`', {
    paragraphs: true
  }), 'code by itself');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      'test ',
      { type: 'code', props: { key: 1 }, children: [ 'something' ] },
    ] }
  ], twitchdown('test `something`', {
    paragraphs: true
  }), 'text then code');

  t.deepEqual([
    { type: 'p', props: { key: 0 }, children: [
      'hello ',
      { type: 'test', props: { key: 1 }, children: [ 'something' ] },
      ' bye'
    ] }
  ], twitchdown('hello <test>something</test> bye', {
    paragraphs: true
  }), 'html tags');
});


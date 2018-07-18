import test from 'ava';
import twitchdown from '../index';

test('wraps text in a paragraph if enabled', (t) => {
  t.deepEqual([ { type: 'p', props: null, children: [ 'hello' ] } ], twitchdown('hello', {
    paragraphs: true
  }));
});

test('doesn\'t wrap headings, code blocks, lists, custom tags and html tags (if separate) in paragraphs', (t) => {
  t.deepEqual([
    { type: 'h1', props: null, children: [ 'heading' ] },
    { type: 'p', props: null, children: [ 'hello you' ] },
    { type: 'h2', props: null, children: [ 'subheading' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('#heading\nhello\n you\n##subheading\nbye', {
    paragraphs: true
  }), 'headings');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'blockquote', props: null, children: [ 'quote' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n> quote\nbye', {
    paragraphs: true
  }), 'blockquotes');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'hr', props: undefined, children: undefined },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n* * *\nbye', {
    paragraphs: true
  }), 'horizontal rules');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'ul', props: null, children: [
      { type: 'li', props: null, children: [ 'item' ] }
    ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello \n- item\nbye', {
    paragraphs: true
  }), 'lists');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'pre', props: { className: 'code poetry' }, children: [ 'something\nelse' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n\tsomething\n\telse\nbye', {
    paragraphs: true
  }), 'quote blocks');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'pre', props: { className: 'code' }, children: [ 'something' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n```\nsomething\n```\nbye', {
    paragraphs: true
  }), 'code blocks');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    'Custom tag'
  ], twitchdown('hello\n{@custom}', {
    paragraphs: true,
    customTags: {
      custom: () => `Custom tag`
    }
  }), 'custom tags');

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'test', props: null, children: [ 'something' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n\n<test>something</test>\n\nbye', {
    paragraphs: true
  }), 'html tags if separate');
});

test('Puts links, images, inline formatting, html tags (if inline) and single quote code in paragraphs', (t) => {
  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' again'
    ] }
  ], twitchdown('test [link](#test) again', {
    paragraphs: true
  }), 'link in text');

  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' woot'
    ] }
  ], twitchdown('[link](#test) woot', {
    paragraphs: true
  }), 'link at start of text');

  t.deepEqual([
    { type: 'p', props: null, children: [
      'hello ',
      { type: 'em', props: null, children: [ 'something' ] },
      ' bye'
    ] }
  ], twitchdown('hello *something* bye', {
    paragraphs: true
  }), 'inline formatting');

  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'img', props: { src: 'image.png', alt: 'image' }, children: undefined },
      ' again'
    ] }
  ], twitchdown('test ![image](image.png) again', {
    paragraphs: true
  }), 'text then image');

  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'img', props: { src: 'image.png', alt: 'image' }, children: undefined },
      ' woot'
    ] }
  ], twitchdown('![image](image.png) woot', {
    paragraphs: true
  }), 'image then text');

  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'code', props: null, children: [ 'something' ] },
    ] }
  ], twitchdown('`something`', {
    paragraphs: true
  }), 'code by itself');

  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'code', props: null, children: [ 'something' ] },
    ] }
  ], twitchdown('test `something`', {
    paragraphs: true
  }), 'text then code');

  t.deepEqual([
    { type: 'p', props: null, children: [
      'hello ',
      { type: 'test', props: null, children: [ 'something' ] },
      ' bye'
    ] }
  ], twitchdown('hello <test>something</test> bye', {
    paragraphs: true
  }), 'html tags');
});

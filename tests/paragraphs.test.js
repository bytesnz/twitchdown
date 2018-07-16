import test from 'ava';
import twitchdown from '../index';

test('wraps text in a paragraph if enabled', (t) => {
  t.deepEqual([ { type: 'p', props: null, children: [ 'hello' ] } ], twitchdown('hello', {
    paragraphs: true
  }));
});

test('doesnt wrap headings, code blocks, lists and custom tags in paragraphs', (t) => {
  t.deepEqual([
    { type: 'h1', props: null, children: [ 'heading' ] },
    { type: 'p', props: null, children: [ 'hello you' ] },
    { type: 'h2', props: null, children: [ 'subheading' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('#heading\nhello\n you\n##subheading\nbye', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'blockquote', props: null, children: [ 'quote' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n> quote\nbye', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'ul', props: null, children: [
      { type: 'li', props: null, children: [ 'item' ] }
    ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello \n- item\nbye', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'pre', props: { className: 'code' }, children: [ 'something' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], twitchdown('hello\n```\nsomething\n```\nbye', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'pre', props: { className: 'code diff' }, children: [ 'something' ] }
  ], twitchdown('hello\n```diff\nsomething\n```', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    'Highlighted diff: \'something\''
  ], twitchdown('hello\n\n```diff\nsomething\n```', {
    paragraphs: true,
    highlight: (content, language) => `Highlighted ${language}: '${content}'`
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    'Custom tag'
  ], twitchdown('hello\n{@custom}', {
    paragraphs: true,
    customTags: {
      custom: (content, language) => `Custom tag`
    }
  }));
});

test('Puts links, images and single quote code in paragraphs', (t) => {
  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' again'
    ] }
  ], twitchdown('test [link](#test) again', {
    paragraphs: true
  }));

  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' woot'
    ] }
  ], twitchdown('[link](#test) woot', {
    paragraphs: true
  }));

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
});

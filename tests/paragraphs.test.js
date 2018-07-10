import test from 'ava';
import reactdown from '../';

test('wraps text in a paragraph if enabled', (t) => {
  t.deepEqual([ { type: 'p', props: null, children: [ 'hello' ] } ], reactdown('hello', {
    paragraphs: true
  }));
});

test('doesnt wrap headings, code blocks and lists in paragraphs', (t) => {
  t.deepEqual([
    { type: 'h1', props: null, children: [ 'heading' ] },
    { type: 'p', props: null, children: [ 'hello you' ] },
    { type: 'h2', props: null, children: [ 'subheading' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], reactdown('#heading\nhello\n you\n##subheading\nbye', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'blockquote', props: null, children: [ 'quote' ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], reactdown('hello\n> quote\nbye', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: null, children: [ 'hello' ] },
    { type: 'ul', props: null, children: [
      { type: 'li', props: null, children: [ 'item' ] }
    ] },
    { type: 'p', props: null, children: [ 'bye' ] }
  ], reactdown('hello\n- item\nbye', {
    paragraphs: true
  }));
});

test('Puts links and images in paragraphs', (t) => {
  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' again'
    ] }
  ], reactdown('test [link](#test) again', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'a', props: { href: '#test' }, children: [ 'link' ] },
      ' woot'
    ] }
  ], reactdown('[link](#test) woot', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: null, children: [
      'test ',
      { type: 'img', props: { src: 'image.png', alt: 'image' }, children: undefined },
      ' again'
    ] }
  ], reactdown('test ![image](image.png) again', {
    paragraphs: true
  }));
  t.deepEqual([
    { type: 'p', props: null, children: [
      { type: 'img', props: { src: 'image.png', alt: 'image' }, children: undefined },
      ' woot'
    ] }
  ], reactdown('![image](image.png) woot', {
    paragraphs: true
  }));
});

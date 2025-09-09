const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

test('parses links', () => {
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] } ], twitchdown('[World](http://example.com)'));
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, ' ago' ], twitchdown('hello [World](http://example.com) ago'));
  assert.deepStrictEqual([ 'hello', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, 'ago' ], twitchdown('hello[World](http://example.com)ago'));
});

test('Newline after header, then link rendered as space', () => {
  assert.deepStrictEqual([ { type: 'h1', props: { key: 0 }, children: ['hello'] }, { type: 'a', props: { key: 1, href: 'http://example.com' }, children: [ 'World' ] }, ' again world' ], twitchdown('# hello\n[World](http://example.com)\nagain\nworld'));
});

test('newline before and after link rendered as space', () => {
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, ' again' ], twitchdown('hello\n[World](http://example.com)\nagain'));
});

test('parses anchor links', () => {
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, href: '#example' }, children: [ 'Example' ] } ], twitchdown('[Example](#example)'));
});

test('parses images', () => {
  assert.deepStrictEqual([ { type: 'img', props: { key: 0, src: 'foo.png', alt: 'title', title: 'title' } } ], twitchdown('![title](foo.png)'));
  assert.deepStrictEqual([ { type: 'img', props: { key: 0, src: 'foo.png' } } ], twitchdown('![](foo.png)'));
});

test('parses images within links', () => {
  assert.deepStrictEqual([ { type: 'a', props: { key: 0 , href: '#toc' }, children: [
    { type: 'img', props: { key: 1 , src: 'toc.png' } }
  ] } ], twitchdown('[![](toc.png)](#toc)'));
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, href: '#a' }, children: [
    { type: 'img', props: { key: 1, src: 'a.png', alt: 'a', title: 'a' } }
  ] }, ' ', {type: 'a', props: { key: 2, href: '#b' }, children: [
    { type: 'img', props: { key: 3, src: 'b.png', alt: 'b', title: 'b' } }
  ] } ], twitchdown('[![a](a.png)](#a) [![b](b.png)](#b)'));
});

test('parses reference links', () => {
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n[world]: http://example.com'));
});

test('use given reference links', () => {
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!', { referenceLinks: { world: 'http://example.com' } }));
});

test('parses reference links without creating excessive linebreaks', () => {
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n\n[world]: http://example.com'));
});

test('parses id reference links', () => {
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World][1]!\n\n[1]: http://example.com'));
});

test('should not add href to link if do not have href or ref', () => {
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, }, children: [ 'World' ] } ], twitchdown('[World]'));
});

test('sets external links to open in a new window (_blank)', () => {
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, href: 'http://example.com', target: '_blank' }, children: [ 'World' ] } ], twitchdown('[World](http://example.com)', { openExternalInNewWindow: true }));
  assert.deepStrictEqual([ { type: 'a', props: { key: 0, href: '#example' }, children: [ 'Example' ] } ], twitchdown('[Example](#example)', { openExternalInNewWindow: true }));
  assert.deepStrictEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com', target: '_blank' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!', { openExternalInNewWindow: true, referenceLinks: { world: 'http://example.com' } }));
});

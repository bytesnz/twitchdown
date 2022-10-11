const test = require('ava');
const twitchdown = require('../index');

test('parses links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] } ], twitchdown('[World](http://example.com)'));
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, ' ago' ], twitchdown('hello [World](http://example.com) ago'));
  t.deepEqual([ 'hello', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, 'ago' ], twitchdown('hello[World](http://example.com)ago'));
});

test('Newline after header, then link rendered as space', (t) => {
  t.deepEqual([ { type: 'h1', props: { key: 0 }, children: ['hello'] }, { type: 'a', props: { key: 1, href: 'http://example.com' }, children: [ 'World' ] }, ' again world' ], twitchdown('# hello\n[World](http://example.com)\nagain\nworld'));
});

test('newline before and after link rendered as space', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, ' again' ], twitchdown('hello\n[World](http://example.com)\nagain'));
});

test('parses anchor links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, href: '#example' }, children: [ 'Example' ] } ], twitchdown('[Example](#example)'));
});

test('parses images', (t) => {
  t.deepEqual([ { type: 'img', props: { key: 0, src: 'foo.png', alt: 'title', title: 'title' } } ], twitchdown('![title](foo.png)'));
  t.deepEqual([ { type: 'img', props: { key: 0, src: 'foo.png' } } ], twitchdown('![](foo.png)'));
});

test('parses images within links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0 , href: '#toc' }, children: [
    { type: 'img', props: { key: 1 , src: 'toc.png' } }
  ] } ], twitchdown('[![](toc.png)](#toc)'));
  t.deepEqual([ { type: 'a', props: { key: 0, href: '#a' }, children: [
    { type: 'img', props: { key: 1, src: 'a.png', alt: 'a', title: 'a' } }
  ] }, ' ', {type: 'a', props: { key: 2, href: '#b' }, children: [
    { type: 'img', props: { key: 3, src: 'b.png', alt: 'b', title: 'b' } }
  ] } ], twitchdown('[![a](a.png)](#a) [![b](b.png)](#b)'));
});

test('parses reference links', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n[world]: http://example.com'));
});

test('use given reference links', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!', { referenceLinks: { world: 'http://example.com' } }));
});

test('parses reference links without creating excessive linebreaks', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!\n\n[world]: http://example.com'));
});

test('parses id reference links', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World][1]!\n\n[1]: http://example.com'));
});

test('should not add href to link if do not have href or ref', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, }, children: [ 'World' ] } ], twitchdown('[World]'));
});

test('sets external links to open in a new window (_blank)', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, href: 'http://example.com', target: '_blank' }, children: [ 'World' ] } ], twitchdown('[World](http://example.com)', { openExternalInNewWindow: true }));
  t.deepEqual([ { type: 'a', props: { key: 0, href: '#example' }, children: [ 'Example' ] } ], twitchdown('[Example](#example)', { openExternalInNewWindow: true }));
  t.deepEqual([ 'hello ', { type: 'a', props: { key: 0, href: 'http://example.com', target: '_blank' }, children: [ 'World' ] }, '!' ], twitchdown('\nhello [World]!', { openExternalInNewWindow: true, referenceLinks: { world: 'http://example.com' } }));
});

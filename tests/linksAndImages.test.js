import test from 'ava';
import twitchdown from '../index';

test('parses links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, href: 'http://example.com' }, children: [ 'World' ] } ], twitchdown('[World](http://example.com)'));
});

test('parses anchor links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, href: '#example' }, children: [ 'Example' ] } ], twitchdown('[Example](#example)'));
});

test('parses images', (t) => {
  t.deepEqual([ { type: 'img', props: { key: 0, src: 'foo.png', alt: 'title', title: 'title' }, children: undefined } ], twitchdown('![title](foo.png)'));
  t.deepEqual([ { type: 'img', props: { key: 0, src: 'foo.png' }, children: undefined } ], twitchdown('![](foo.png)'));
});

test('parses images within links', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0 , href: '#toc' }, children: [
    { type: 'img', props: { key: 1 , src: 'toc.png' }, children: undefined }
  ] } ], twitchdown('[![](toc.png)](#toc)'));
  t.deepEqual([ { type: 'a', props: { key: 0, href: '#a' }, children: [
    { type: 'img', props: { key: 1, src: 'a.png', alt: 'a', title: 'a' }, children: undefined }
  ] }, ' ', {type: 'a', props: { key: 2, href: '#b' }, children: [
    { type: 'img', props: { key: 3, src: 'b.png', alt: 'b', title: 'b' }, children: undefined }
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

test('should not add href to link if do not have href or ref', (t) => {
  t.deepEqual([ { type: 'a', props: { key: 0, }, children: [ 'World' ] } ], twitchdown('[World]'));
});


import test from 'ava';
import reactdown from '../';

test('parses links', (t) => {
  t.deepEqual([ { type: 'a', props: { href: 'http://github.com/developit/reactdown' }, children: [ 'Snarkdown' ] } ], reactdown('[Snarkdown](http://github.com/developit/reactdown)'));
});

test('parses anchor links', (t) => {
  t.deepEqual([ { type: 'a', props: { href: '#example' }, children: [ 'Example' ] } ], reactdown('[Example](#example)'));
});

test('parses images', (t) => {
  t.deepEqual([ { type: 'img', props: { src: 'foo.png', alt: 'title' }, children: undefined } ], reactdown('![title](foo.png)'));
  t.deepEqual([ { type: 'img', props: { src: 'foo.png', alt: '' }, children: undefined } ], reactdown('![](foo.png)'));
});

test('parses images within links', (t) => {
  t.deepEqual([ { type: 'a', props: { href: '#toc' }, children: [
    { type: 'img', props: { src: 'toc.png', alt: '' }, children: undefined }
  ] } ], reactdown('[![](toc.png)](#toc)'));
  t.deepEqual([ { type: 'a', props: { href: '#a' }, children: [
    { type: 'img', props: { src: 'a.png', alt: 'a' }, children: undefined }
  ] }, ' ', {type: 'a', props: { href: '#b' }, children: [
    { type: 'img', props: { src: 'b.png', alt: 'b' }, children: undefined }
  ] } ], reactdown('[![a](a.png)](#a) [![b](b.png)](#b)'));
});

test('parses reference links', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { href: 'http://world.com' }, children: [ 'World' ] }, '!' ], reactdown('\nhello [World]!\n[world]: http://world.com'));
});

test('parses reference links without creating excessive linebreaks', (t) => {
  t.deepEqual([ 'hello ', { type: 'a', props: { href: 'http://world.com' }, children: [ 'World' ] }, '!' ], reactdown('\nhello [World]!\n\n[world]: http://world.com'));
});


const { test } = require('node:test');
const assert = require('node:assert');
const twitchdown = require('../index');

const options = {
  removeTags: [ 'bad' ],
  stripTags: [ 'notsobad' ]
};

test('closes unclosed tags', () => {
  assert.deepStrictEqual([ { type: 'em', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<em>stuff'));
});

test('handles void html elements', () => {
  assert.deepStrictEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg">end'));
  assert.deepStrictEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg"/>end'));
  assert.deepStrictEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg" />end'));
  assert.deepStrictEqual([ 'test', { type: 'map', props: { key: 0 }, children: [ { type: 'area', props: { key: 1 } } ] }, 'end' ], twitchdown('test<map><area></map>end'));
  assert.deepStrictEqual([ 'test', { type: 'base', props: { key: 0, href: 'test' } }, 'end' ], twitchdown('test<base href="test">end'));
  assert.deepStrictEqual([ 'test', { type: 'br', props: { key: 0 } }, 'end' ], twitchdown('test<br>end'));
  assert.deepStrictEqual([ 'test', { type: 'colgroup', props: { key: 0 }, children: [ { type: 'col', props: { key: 1 } } ] }, 'end' ], twitchdown('test<colgroup><col></colgroup>end'));
  assert.deepStrictEqual([ 'test', { type: 'embed', props: { key: 0 } }, 'end' ], twitchdown('test<embed>end'));
  assert.deepStrictEqual([ 'test', { type: 'hr', props: { key: 0 } }, 'end' ], twitchdown('test<hr>end'));
  assert.deepStrictEqual([ 'test', { type: 'input', props: { key: 0, type: 'text' } }, 'end' ], twitchdown('test<input type="text">end'));
  assert.deepStrictEqual([ 'test', { type: 'link', props: { key: 0 } }, 'end' ], twitchdown('test<link>end'));
  assert.deepStrictEqual([ 'test', { type: 'meta', props: { key: 0 } }, 'end' ], twitchdown('test<meta>end'));
  assert.deepStrictEqual([ 'test', { type: 'param', props: { key: 0 } }, 'end' ], twitchdown('test<param>end'));
  assert.deepStrictEqual([ 'test', { type: 'source', props: { key: 0 } }, 'end' ], twitchdown('test<source>end'));
  assert.deepStrictEqual([ 'test', { type: 'track', props: { key: 0 } }, 'end' ], twitchdown('test<track>end'));
  assert.deepStrictEqual([ 'test', { type: 'wbr', props: { key: 0 } }, 'end' ], twitchdown('test<wbr>end'));
})

test('removes script tags by default', () => {
  assert.deepStrictEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<script>bad stuff</script><good>stuff</good>'));
  assert.deepStrictEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><script>bad stuff'), 'incomplete script tag');
});

test('removes tags given in removeTags', () => {
  assert.deepStrictEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<bad>bad stuff</bad><good>stuff</good>', options));
  assert.deepStrictEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><bad>bad stuff', options), 'incomplete bad tag');
});

test('handles tags with attributes', () => {
  assert.deepStrictEqual([ { type: 'good', props: { key: 1, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<bad test="hello" disabled>bad stuff</bad><good test="hello" disabled>stuff</good>', options), 'with attributes');
  assert.deepStrictEqual([ { type: 'good', props: { key: 0, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<good test="hello" disabled>stuff</good><bad test="hello" disabled>bad stuff', options), 'incomplete bad tag with attributes');
});

test('strip tags but leaves content of tags given in stripTags', () => {
  assert.deepStrictEqual([ 'not so bad stuff', { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<notsobad>not so bad stuff</notsobad><good>stuff</good>', options));
  assert.deepStrictEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] }, 'not so bad stuff' ], twitchdown('<good>stuff</good><notsobad>not so bad stuff', options), 'incomplete strip tag');
});

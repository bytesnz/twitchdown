import test from 'ava';
import twitchdown from '../index';

const options = {
  removeTags: [ 'bad' ],
  stripTags: [ 'notsobad' ]
};

test('closes unclosed tags', (t) => {
  t.deepEqual([ { type: 'em', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<em>stuff'));
});

test('handles void html elements', (t) => {
  t.deepEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg">end'));
  t.deepEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg"/>end'));
  t.deepEqual([ 'test', { type: 'img', props: { key: 0, src: 'test.jpg' } }, 'end' ], twitchdown('test<img src="test.jpg" />end'));
  t.deepEqual([ 'test', { type: 'map', props: { key: 0 }, children: [ { type: 'area', props: { key: 1 } } ] }, 'end' ], twitchdown('test<map><area></map>end'));
  t.deepEqual([ 'test', { type: 'base', props: { key: 0, href: 'test' } }, 'end' ], twitchdown('test<base href="test">end'));
  t.deepEqual([ 'test', { type: 'br', props: { key: 0 } }, 'end' ], twitchdown('test<br>end'));
  t.deepEqual([ 'test', { type: 'colgroup', props: { key: 0 }, children: [ { type: 'col', props: { key: 1 } } ] }, 'end' ], twitchdown('test<colgroup><col></colgroup>end'));
  t.deepEqual([ 'test', { type: 'embed', props: { key: 0 } }, 'end' ], twitchdown('test<embed>end'));
  t.deepEqual([ 'test', { type: 'hr', props: { key: 0 } }, 'end' ], twitchdown('test<hr>end'));
  t.deepEqual([ 'test', { type: 'input', props: { key: 0, type: 'text' } }, 'end' ], twitchdown('test<input type="text">end'));
  t.deepEqual([ 'test', { type: 'link', props: { key: 0 } }, 'end' ], twitchdown('test<link>end'));
  t.deepEqual([ 'test', { type: 'meta', props: { key: 0 } }, 'end' ], twitchdown('test<meta>end'));
  t.deepEqual([ 'test', { type: 'param', props: { key: 0 } }, 'end' ], twitchdown('test<param>end'));
  t.deepEqual([ 'test', { type: 'source', props: { key: 0 } }, 'end' ], twitchdown('test<source>end'));
  t.deepEqual([ 'test', { type: 'track', props: { key: 0 } }, 'end' ], twitchdown('test<track>end'));
  t.deepEqual([ 'test', { type: 'wbr', props: { key: 0 } }, 'end' ], twitchdown('test<wbr>end'));
})

test('removes script tags by default', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<script>bad stuff</script><good>stuff</good>'));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><script>bad stuff'), 'incomplete script tag');
});

test('removes tags given in removeTags', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<bad>bad stuff</bad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] } ], twitchdown('<good>stuff</good><bad>bad stuff', options), 'incomplete bad tag');
});

test('handles tags with attributes', (t) => {
  t.deepEqual([ { type: 'good', props: { key: 1, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<bad test="hello" disabled>bad stuff</bad><good test="hello" disabled>stuff</good>', options), 'with attributes');
  t.deepEqual([ { type: 'good', props: { key: 0, test: 'hello', disabled: true }, children: [ 'stuff' ] } ], twitchdown('<good test="hello" disabled>stuff</good><bad test="hello" disabled>bad stuff', options), 'incomplete bad tag with attributes');
});

test('strip tags but leaves content of tags given in stripTags', (t) => {
  t.deepEqual([ 'not so bad stuff', { type: 'good', props: { key: 1 }, children: [ 'stuff' ] } ], twitchdown('<notsobad>not so bad stuff</notsobad><good>stuff</good>', options));
  t.deepEqual([ { type: 'good', props: { key: 0 }, children: [ 'stuff' ] }, 'not so bad stuff' ], twitchdown('<good>stuff</good><notsobad>not so bad stuff', options), 'incomplete strip tag');
});
